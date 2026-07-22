import { Body, Controller, Delete, Get, Injectable, Module, Param, Patch, Post } from "@nestjs/common";
import { id, store } from "../store";

@Injectable()
export class CartService {
  view(userId: string) {
    const cart = store.carts.find((entry) => entry.userId === userId);
    if (!cart) return { cart: null, items: [] };
    return {
      cart,
      items: store.cartItems.filter((item) => item.cartId === cart.id)
    };
  }

  add(userId: string, productId: string, quantity: number) {
    let cart = store.carts.find((entry) => entry.userId === userId);
    if (!cart) {
      cart = { id: id("cart"), userId };
      store.carts.push(cart);
    }
    const item = { id: id("item"), cartId: cart.id, productId, quantity };
    store.cartItems.push(item);
    return item;
  }

  update(itemId: string, quantity: number) {
    const item = store.cartItems.find((entry) => entry.id === itemId);
    if (!item) return null;
    item.quantity = quantity;
    return item;
  }

  remove(itemId: string) {
    const index = store.cartItems.findIndex((entry) => entry.id === itemId);
    if (index === -1) return false;
    store.cartItems.splice(index, 1);
    return true;
  }
}

@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(":userId")
  view(@Param("userId") userId: string) {
    return this.cartService.view(userId);
  }

  @Post(":userId/items")
  add(@Param("userId") userId: string, @Body() body: { productId: string; quantity: number }) {
    return this.cartService.add(userId, body.productId, body.quantity);
  }

  @Patch("items/:itemId")
  update(@Param("itemId") itemId: string, @Body() body: { quantity: number }) {
    return this.cartService.update(itemId, body.quantity);
  }

  @Delete("items/:itemId")
  remove(@Param("itemId") itemId: string) {
    return this.cartService.remove(itemId);
  }
}

@Module({
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}
