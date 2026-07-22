import { Body, Controller, Injectable, Module, Post } from "@nestjs/common";

@Injectable()
export class NotificationsService {
  sendEmail(recipient: string, subject: string, message: string) {
    return { channel: "email", recipient, subject, message, sent: true };
  }

  sendSms(recipient: string, message: string) {
    return { channel: "sms", recipient, message, sent: true };
  }

  orderUpdate(orderId: string, state: string) {
    return { channel: "order-update", orderId, state, sent: true };
  }
}

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post("email")
  sendEmail(@Body() body: { recipient: string; subject: string; message: string }) {
    return this.notificationsService.sendEmail(body.recipient, body.subject, body.message);
  }

  @Post("sms")
  sendSms(@Body() body: { recipient: string; message: string }) {
    return this.notificationsService.sendSms(body.recipient, body.message);
  }

  @Post("order-update")
  orderUpdate(@Body() body: { orderId: string; state: string }) {
    return this.notificationsService.orderUpdate(body.orderId, body.state);
  }
}

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService]
})
export class NotificationsModule {}
