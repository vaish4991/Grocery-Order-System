import { Body, Controller, Injectable, Module, Param, Post } from "@nestjs/common";
import { store } from "../store";

@Injectable()
export class PaymentsService {
  initiate(orderId: string, method: "razorpay" | "cod") {
    const payment = store.payments.find((entry) => entry.orderId === orderId);
    if (!payment) return null;
    payment.method = method;
    payment.status = method === "cod" ? "succeeded" : "pending";
    return payment;
  }

  verify(orderId: string, transactionId: string) {
    const payment = store.payments.find((entry) => entry.orderId === orderId && entry.transactionId === transactionId);
    if (!payment) return null;
    payment.status = "succeeded";
    const order = store.orders.find((entry) => entry.id === orderId);
    if (order) {
      order.paymentStatus = "paid";
      order.status = "confirmed";
    }
    return payment;
  }
}

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("initiate/:orderId")
  initiate(@Param("orderId") orderId: string, @Body() body: { method: "razorpay" | "cod" }) {
    return this.paymentsService.initiate(orderId, body.method);
  }

  @Post("verify/:orderId")
  verify(@Param("orderId") orderId: string, @Body() body: { transactionId: string }) {
    return this.paymentsService.verify(orderId, body.transactionId);
  }
}

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService]
})
export class PaymentsModule {}
