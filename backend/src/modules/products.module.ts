import { Body, Controller, Delete, Get, Injectable, Module, Param, Post, Put, Query } from "@nestjs/common";
import { id, store } from "../store";

@Injectable()
export class ProductsService {
  list() {
    return store.products;
  }

  search(query: string) {
    const term = query.toLowerCase();
    return store.products.filter((product) => product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term));
  }

  detail(slug: string) {
    return store.products.find((product) => product.slug === slug) ?? null;
  }

  create(input: Record<string, unknown>) {
    const product = { id: id("prd"), status: "active", ...input };
    store.products.push(product as never);
    return product;
  }

  update(idValue: string, input: Record<string, unknown>) {
    const product = store.products.find((entry) => entry.id === idValue);
    if (!product) return null;
    Object.assign(product, input);
    return product;
  }

  remove(idValue: string) {
    const index = store.products.findIndex((entry) => entry.id === idValue);
    if (index === -1) return false;
    store.products.splice(index, 1);
    return true;
  }
}

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  list() {
    return this.productsService.list();
  }

  @Get("search")
  search(@Query("q") query = "") {
    return this.productsService.search(query);
  }

  @Get(":slug")
  detail(@Param("slug") slug: string) {
    return this.productsService.detail(slug);
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.productsService.create(body);
  }

  @Put(":id")
  update(@Param("id") idValue: string, @Body() body: Record<string, unknown>) {
    return this.productsService.update(idValue, body);
  }

  @Delete(":id")
  remove(@Param("id") idValue: string) {
    return this.productsService.remove(idValue);
  }
}

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
