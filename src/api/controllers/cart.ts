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

  /**
   * Get all cart items for a specific user.
   * @param req - Express request object, expects `userId` on the request.
   * @param res - Express response object.
   */
  async getAllCartItems(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as Request & { userId?: string }).userId;

      if (!userId || !Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid or missing userId");
      }

      const cartData = await CartService.getAllCartItems(new Types.ObjectId(userId));

      const host = req.headers.host;
      const links = [
        {
          rel: "self",
          href: `http://${host}/carts`,
          method: "GET",
          description: "View all items in your cart",
        },
        {
          rel: "add_to_cart",
          href: `http://${host}/carts`,
          method: "POST",
          description: "Add an item to your cart",
        },
        {
          rel: "empty_cart",
          href: `http://${host}/carts/empty`,
          method: "DELETE",
          description: "Empty your cart",
        },
        {
          rel: "remove_item",
          href: `http://${host}/carts/:itemId`,
          method: "DELETE",
          description: "Remove an item from the cart",
        },
      ];

      res.status(200).json(new ApiResponse(200, { cart: cartData, links }, "Cart items retrieved successfully"));
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
