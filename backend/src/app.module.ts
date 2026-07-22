import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthModule } from "./modules/auth.module";
import { CartModule } from "./modules/cart.module";
import { CategoriesModule } from "./modules/categories.module";
import { CouponsModule } from "./modules/coupons.module";
import { NotificationsModule } from "./modules/notifications.module";
import { OrdersModule } from "./modules/orders.module";
import { PaymentsModule } from "./modules/payments.module";
import { ProductsModule } from "./modules/products.module";
import { ReviewsModule } from "./modules/reviews.module";
import { UsersModule } from "./modules/users.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    ReviewsModule,
    CouponsModule,
    NotificationsModule
  ],
  controllers: [AppController]
})
export class AppModule {}
