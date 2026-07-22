import { Body, Controller, Get, Injectable, Module, Param, Post } from "@nestjs/common";
import { store } from "../store";

@Injectable()
export class CouponsService {
  validate(code: string) {
    return store.coupons.find((coupon) => coupon.code === code) ?? null;
  }

  apply(code: string, orderTotal: number) {
    const coupon = this.validate(code);
    if (!coupon) return null;
    const discount = coupon.discountType === "percent" ? (orderTotal * coupon.discountValue) / 100 : coupon.discountValue;
    return {
      coupon,
      discount,
      payableAmount: Math.max(orderTotal - discount, 0)
    };
  }
}

@Controller("coupons")
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get(":code")
  validate(@Param("code") code: string) {
    return this.couponsService.validate(code);
  }

  @Post("apply")
  apply(@Body() body: { code: string; orderTotal: number }) {
    return this.couponsService.apply(body.code, body.orderTotal);
  }
}

@Module({
  controllers: [CouponsController],
  providers: [CouponsService],
  exports: [CouponsService]
})
export class CouponsModule {}
