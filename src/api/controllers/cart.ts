import { Request, Response } from "express";
import { Types } from "mongoose";
import CartService from "../../domain/services/cart/cart.service";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import { getUserId } from "../../utils/JwtExtract";

export type CreateAddToCartRequest = {
  productId: string;
  quantity?: number;
};

class CartController {
  async createAddToCart(req: Request, res: Response): Promise<void> {
    const userId = getUserId(req);
    const createAddToCartRequest = req.body as CreateAddToCartRequest;
    const { quantity = 1 } = createAddToCartRequest;

    if (quantity <= 0) {
      throw new ApiError(
        400,
        "Invalid userId, productId, or quantity provided"
      );
    }

    const [cart, error] = await CartService.createCart(
      new Types.ObjectId(userId),
      createAddToCartRequest
    )
      .then((data) => [data, null])
      .catch((err) => [null, err]);

    if (error) {
      if (error instanceof ApiError) {
        res
          .status(error.statusCode)
          .json(new ApiResponse(error.statusCode, null, error.message));
      } else {
        res
          .status(500)
          .json(new ApiResponse(500, null, "An unexpected error occurred"));
      }
    }

    res
      .status(201)
      .json(new ApiResponse(201, { cart }, "Item added to cart successfully"));
  }

  /**
   * Get all cart items for a specific user.
   * @param req - Express request object, expects `userId` on the request.
   * @param res - Express response object.
   */
  async getAllCartItems(req: Request, res: Response): Promise<void> {
    const userId = getUserId(req);
    const [cartData, error] = await CartService.getAllCartItems(userId)
      .then((data) => [data, null])
      .catch((err) => [null, err]);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { cart: error != null ? [] : cartData },
          "Cart items retrieved successfully"
        )
      );
  }

  async updateCartItem(req: Request, res: Response): Promise<void> {
    try {
      const userId = getUserId(req);
      const { productId, quantity } = req.body;

      if (
        !userId ||
        !Types.ObjectId.isValid(userId) ||
        !Types.ObjectId.isValid(productId) ||
        quantity <= 0
      ) {
        throw new ApiError(
          400,
          "Invalid userId, productId, or quantity provided"
        );
      }

      const updatedCart = await CartService.updateCart(
        new Types.ObjectId(userId),
        new Types.ObjectId(productId),
        quantity
      );

      const host = req.headers.host;
      const links = [
        {
          rel: "view_cart",
          href: `http://${host}/carts`,
          method: "GET",
          description: "View your cart",
        },
        {
          rel: "add_to_cart",
          href: `http://${host}/carts`,
          method: "POST",
          description: "Add item to cart",
        },
        {
          rel: "empty_cart",
          href: `http://${host}/carts/empty`,
          method: "DELETE",
          description: "Empty the cart",
        },
        {
          rel: "remove_item",
          href: `http://${host}/carts`,
          method: "DELETE",
          description: "Remove item from cart using body id",
        },
        {
          rel: "update_quantity",
          href: `http://${host}/carts`,
          method: "PATCH",
          description: "Update item quantity in cart using body id",
        },
      ];

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { cart: updatedCart, links },
            "Cart updated successfully"
          )
        );
    } catch (error) {
      if (error instanceof ApiError) {
        res
          .status(error.statusCode)
          .json(new ApiResponse(error.statusCode, null, error.message));
      } else {
        res
          .status(500)
          .json(new ApiResponse(500, null, "An unexpected error occurred"));
      }
    }
  }

  async removeItemFromCarts(req: Request, res: Response): Promise<void> {
    try {
      const userId = getUserId(req);
      const { productId } = req.params;

      if (
        !userId ||
        !Types.ObjectId.isValid(userId) ||
        !Types.ObjectId.isValid(productId)
      ) {
        throw new ApiError(400, "Invalid userId or productId provided");
      }

      const cart = await CartService.removeItemFromCart(
        new Types.ObjectId(userId),
        new Types.ObjectId(productId)
      );

      if (!cart) {
        throw new ApiError(404, "Cart not found or product not found in cart");
      }

      const host = req.headers.host;
      const links = [
        {
          rel: "view_cart",
          href: `http://${host}/carts`,
          method: "GET",
          description: "View Cart",
        },
        {
          rel: "add_to_cart",
          href: `http://${host}/carts`,
          method: "POST",
          description: "Add item to cart",
        },
        {
          rel: "orders",
          href: `http://${host}/orders`,
          method: "GET",
          description: "Orders",
        },
      ];

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { cart, links },
            "Item removed from cart successfully"
          )
        );
    } catch (error) {
      if (error instanceof ApiError) {
        res
          .status(error.statusCode)
          .json(new ApiResponse(error.statusCode, null, error.message));
      } else {
        res
          .status(500)
          .json(new ApiResponse(500, null, "An unexpected error occurred"));
      }
    }
  }
}

export default new CartController();
