import { Request, Response } from "express";
import { Types } from "mongoose";
import CartService from "../../domain/services/cart/cart.service";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";

class CartController {
  async createAddToCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as Request & { userId?: string }).userId;
      const { productId, quantity = 1 } = req.body;

      if (quantity <= 0) {
        throw new ApiError(400, "Quantity must be greater than 0");
      }

      // if (!userId || !Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId) || quantity <= 0) {
      //   throw new ApiError(400, "Invalid userId, productId, or quantity provided");
      // }

      const cart = await CartService.createCart(
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
          description: "View Cart",
        },
        {
          rel: "orders",
          href: `http://${host}/orders`,
          method: "GET",
          description: "Orders",
        },
      ];

      res
        .status(201)
        .json(
          new ApiResponse(
            201,
            { cart, links },
            "Item added to cart successfully"
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

  /**
   * Get all cart items for a specific user.
   * @param req - Express request object, expects `userId` on the request.
   * @param res - Express response object.
   */
  async getAllCartItems(req: Request, res: Response): Promise<void> {
    const userId = (req as Request & { userId?: string }).userId;
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

    const [cartData, error] = await CartService.getAllCartItems(
      new Types.ObjectId(userId)
    )
      .then((data) => [data, null])
      .catch((err) => [null, err]);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { cart: error != null ? [] : cartData, links },
          "Cart items retrieved successfully"
        )
      );
  }

  async updateCartItem(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as Request & { user: { userId?: string } }).user
        ?.userId;
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
      const userId = (req as Request & { userId?: string }).userId;
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
