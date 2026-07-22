import { Body, Controller, Delete, Get, Injectable, Module, Param, Post } from "@nestjs/common";
import { id, store } from "../store";

@Injectable()
export class OrdersService {
  create(userId: string, items: Array<{ productId: string; quantity: number }>, totalAmount: number) {
    const order = {
      id: id("order"),
      userId,
      orderNumber: `ORD-${Date.now()}`,
      status: "pending" as const,
      totalAmount,
      paymentStatus: "pending" as const
    };

    store.orders.push(order);
    store.payments.push({
      id: id("pay"),
      orderId: order.id,
      transactionId: `txn-${Date.now()}`,
      amount: totalAmount,
      status: "initiated",
      method: "razorpay"
    });

    return { order, items };
  }

  track(idValue: string) {
    return store.orders.find((order) => order.id === idValue) ?? null;
  }

  cancel(idValue: string) {
    const order = store.orders.find((entry) => entry.id === idValue);
    if (!order) return null;
    order.status = "cancelled";
    return order;
  }

  history(userId: string) {
    return store.orders.filter((order) => order.userId === userId);
  }
}

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() body: { userId: string; items: Array<{ productId: string; quantity: number }>; totalAmount: number }) {
    return this.ordersService.create(body.userId, body.items, body.totalAmount);
  }

  @Get(":id")
  track(@Param("id") idValue: string) {
    return this.ordersService.track(idValue);
  }

  @Delete(":id")
  cancel(@Param("id") idValue: string) {
    return this.ordersService.cancel(idValue);
  }

  @Get("history/:userId")
  history(@Param("userId") userId: string) {
    return this.ordersService.history(userId);
  }
}

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
