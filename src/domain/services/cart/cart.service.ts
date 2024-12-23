import { Types } from "mongoose";
import CartRepository from "../../../infrastructure/repositories/cart.repository";
import Product, {
  ProductDocument,
} from "../../../infrastructure/models/product/product";
import CartProduct from "../../../infrastructure/models/cart/cart-product";
import User from "../../../infrastructure/models/user/user";
import ApiError from "../../../utils/ApiError";
import { ICart } from "../../../infrastructure/models/cart/cart";
import OrderProduct from "../../../infrastructure/models/order/order-product";
import Order from "../../../infrastructure/models/order/order";
import { Request, Response } from "express";
import { CreateAddToCartRequest } from "src/api/controllers/cart";

class CartService {
  /**
   * Create or update cart.
   * @param userId - The ID of the user to retrieve cart items for.
   * @param req - CreateAddToCartRequest which contains user request.
   * @returns The user's cart with updated products.
   */
  async createCart(
    userId: Types.ObjectId,
    req: CreateAddToCartRequest
  ): Promise<ICart> {
    const product: ProductDocument | null = await Product.findById(
      req.productId
    );
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    const cart: ICart = await this.updateAndCreateCart(userId);

    await this.updateAndCreateCartProduct(cart, req.quantity ?? 1, product);

    await this.updateTotalPrice(cart);

    return await CartRepository.create(cart);
  }

  private async updateAndCreateCart(userId: Types.ObjectId): Promise<ICart> {
    let cart = await CartRepository.findByUserId(userId);
    if (!cart) {
      cart = await CartRepository.create({ userId, totalPrice: 0 });
      const user = await User.findById(userId);
      if (user) {
        (user as any).carts.push(cart._id);
        await user.save({ validateBeforeSave: false });
      }
    }
    return cart;
  }

  private async updateAndCreateCartProduct(
    cart: ICart,
    quantity: number,
    product: ProductDocument
  ) {
    let cartProduct = await CartProduct.findOne({
      cartId: cart._id,
      productId: product._id,
    });
    if (cartProduct) {
      cartProduct.quantity += quantity;
    } else {
      cartProduct = new CartProduct({
        cartId: cart._id,
        productId: product._id,
        quantity: quantity,
        price: product.price,
      });
    }
    await cartProduct.save();
  }

  private async updateTotalPrice(cart: ICart): Promise<void> {
    const cartProducts = await CartProduct.find({ cartId: cart._id });
    const totalPrice = cartProducts.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.toString());
      return total + itemPrice * item.quantity;
    }, 0);

    cart.totalPrice = totalPrice;
  }

  /**
   * Retrieves all cart items for a specific user by userId.
   * @param userId - The ID of the user to retrieve cart items for.
   * @returns The user's cart with populated product details, or an error if not found.
   */
  async getAllCartItems(userId: string) {
    const cart: ICart | null = await CartRepository.findByUserId(
      new Types.ObjectId(userId)
    );
    if (!cart) {
      throw new ApiError(404, "Cart not found for this user");
    }

    const cartProducts = await CartRepository.findCartProducts(
      cart._id as Types.ObjectId
    );
    if (!cartProducts) {
      throw new ApiError(404, "Cart is empty for this user");
    }

    const totalPrice = cartProducts.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.toString());
      return total + itemPrice * item.quantity;
    }, 0);

    await CartRepository.updateTotalPrice(
      cart._id as Types.ObjectId,
      totalPrice
    );

    // const order = await Order.findOne({ userId, totalPrice }).select(
    //   "-userId -orderProductId"
    // );

    return {
      ...cart.toObject(),
      items: cartProducts,
      // order: order ? order.toObject() : null,
    };
  }

  /**
   * Updates the quantity of a specific product in the user's cart.
   * @param userId - The user's ObjectId.
   * @param productId - The product's ObjectId.
   * @param quantity - The new quantity of the product.
   * @returns The updated cart.
   */
  async updateCart(
    userId: Types.ObjectId,
    productId: Types.ObjectId,
    quantity: number
  ) {
    try {
      const cart = await CartRepository.findByUserId(userId);
      if (!cart) {
        throw new ApiError(404, "Cart not found for this user");
      }

      const product = await Product.findById(productId);
      if (!product) {
        throw new ApiError(404, "Product not found");
      }

      let cartProduct = await CartRepository.findCartItem(
        cart._id as Types.ObjectId,
        productId
      );
      if (cartProduct) {
        if (quantity <= 0) {
          await CartRepository.removeCartItem(
            cart._id as Types.ObjectId,
            productId
          );
        } else {
          cartProduct.quantity = quantity;
          await cartProduct.save();
        }
      } else if (quantity > 0) {
        cartProduct = new CartProduct({
          cartId: cart._id,
          productId,
          quantity,
          price: product.price,
        });
        await cartProduct.save();
      }

      const cartProducts = await CartRepository.findCartProducts(
        cart._id as Types.ObjectId
      );
      const totalPrice = cartProducts.reduce((total, item) => {
        const itemPrice = parseFloat(item.price.toString());
        return total + itemPrice * item.quantity;
      }, 0);

      await CartRepository.updateTotalPrice(
        cart._id as Types.ObjectId,
        totalPrice
      );

      return { ...cart.toObject(), items: cartProducts };
    } catch (error) {
      throw new ApiError(500, "Failed to update cart");
    }
  }

  /**
   * Removes a specific product from the user's cart.
   * @param userId - The user's ObjectId.
   * @param productId - The product's ObjectId to be removed.
   * @returns The updated cart.
   */
  async removeItemFromCart(
    userId: Types.ObjectId,
    productId: Types.ObjectId
  ): Promise<ICart> {
    const cart = await CartRepository.findByUserId(userId);
    if (!cart) {
      throw new ApiError(404, "Cart not found for this user");
    }

    const cartProduct = await CartRepository.findCartItem(
      cart._id as Types.ObjectId,
      productId
    );
    if (!cartProduct) {
      throw new ApiError(404, "Product not found in cart");
    }

    await CartRepository.removeCartItem(cart._id as Types.ObjectId, productId);

    const cartProducts = await CartRepository.findCartProducts(
      cart._id as Types.ObjectId
    );
    const totalPrice = cartProducts.reduce((total, item) => {
      return total + parseFloat(item.price.toString()) * item.quantity;
    }, 0);

    await CartRepository.updateTotalPrice(
      cart._id as Types.ObjectId,
      totalPrice
    );

    return { ...cart.toObject(), items: cartProducts };
  }
}

export default new CartService();
