import { Body, Controller, Delete, Injectable, Module, Param, Patch, Post } from "@nestjs/common";
import { id, store } from "../store";

@Injectable()
export class ReviewsService {
  add(userId: string, productId: string, rating: number, comment: string) {
    const review = { id: id("review"), userId, productId, rating, comment };
    store.reviews.push(review);
    return review;
  }

  edit(reviewId: string, rating: number, comment: string) {
    const review = store.reviews.find((entry) => entry.id === reviewId);
    if (!review) return null;
    review.rating = rating;
    review.comment = comment;
    return review;
  }

  remove(reviewId: string) {
    const index = store.reviews.findIndex((entry) => entry.id === reviewId);
    if (index === -1) return false;
    store.reviews.splice(index, 1);
    return true;
  }
}

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  add(@Body() body: { userId: string; productId: string; rating: number; comment: string }) {
    return this.reviewsService.add(body.userId, body.productId, body.rating, body.comment);
  }

  @Patch(":id")
  edit(@Param("id") reviewId: string, @Body() body: { rating: number; comment: string }) {
    return this.reviewsService.edit(reviewId, body.rating, body.comment);
  }

  @Delete(":id")
  remove(@Param("id") reviewId: string) {
    return this.reviewsService.remove(reviewId);
  }
}

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService]
})
export class ReviewsModule {}
