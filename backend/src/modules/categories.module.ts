import { Body, Controller, Delete, Get, Injectable, Module, Param, Post, Put } from "@nestjs/common";
import { id, store } from "../store";

@Injectable()
export class CategoriesService {
  list() {
    return store.categories;
  }

  create(input: { name: string; slug: string; description: string; image: string }) {
    const category = { id: id("cat"), ...input };
    store.categories.push(category);
    return category;
  }

  update(idValue: string, input: Partial<{ name: string; slug: string; description: string; image: string }>) {
    const category = store.categories.find((entry) => entry.id === idValue);
    if (!category) return null;
    Object.assign(category, input);
    return category;
  }

  remove(idValue: string) {
    const index = store.categories.findIndex((entry) => entry.id === idValue);
    if (index === -1) return false;
    store.categories.splice(index, 1);
    return true;
  }
}

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  list() {
    return this.categoriesService.list();
  }

  @Post()
  create(@Body() body: { name: string; slug: string; description: string; image: string }) {
    return this.categoriesService.create(body);
  }

  @Put(":id")
  update(@Param("id") idValue: string, @Body() body: Partial<{ name: string; slug: string; description: string; image: string }>) {
    return this.categoriesService.update(idValue, body);
  }

  @Delete(":id")
  remove(@Param("id") idValue: string) {
    return this.categoriesService.remove(idValue);
  }
}

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
