import { Request, Response } from "express";
import { Types } from "mongoose";
import CartService from "../../domain/services/cart.service";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";

class CartController {
  async createAddToCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as Request & { userId?: string }).userId;
      const { productId, quantity = 1 } = req.body;

      if (!userId || !Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId) || quantity <= 0) {
        throw new ApiError(400, "Invalid userId, productId, or quantity provided");
      }

      const cart = await CartService.createOrUpdateCart(
        new Types.ObjectId(userId),
        new Types.ObjectId(productId),
        quantity
      );

      const host = req.headers.host;
      const links = [
        { rel: "view_cart", href: `http://${host}/carts`, method: "GET", description: "View Cart" },
        { rel: "orders", href: `http://${host}/orders`, method: "GET", description: "Orders" },
      ];

      res.status(201).json(new ApiResponse(201, { cart, links }, "Item added to cart successfully"));
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
      } else {
        res.status(500).json(new ApiResponse(500, null, "An unexpected error occurred"));
      }
    }
  }
}

export default new CartController();
