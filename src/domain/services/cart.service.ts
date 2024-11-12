import { Types } from "mongoose";
import CartRepository from "../../infrastructure/repositories/cart.repository";
import Product from "../../infrastructure/models/product";
import CartProduct from "../../infrastructure/models/cart-product";
import User from "../../infrastructure/models/user";
import ApiError from "../../utils/ApiError";
import { ICart } from "../../infrastructure/models/cart";
import OrderProduct from "../../infrastructure/models/order-product";

class CartService {
  async createOrUpdateCart(userId: Types.ObjectId, productId: Types.ObjectId, quantity: number): Promise<ICart> {
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    let cart = await CartRepository.findByUserId(userId);
    if (!cart) {
      cart = await CartRepository.create({ userId, totalPrice: 0 });
      const user = await User.findById(userId);
      if (user) {
        (user as any).carts.push(cart._id);
        await user.save({ validateBeforeSave: false });
      }
    }

    let cartProduct = await CartProduct.findOne({ cartId: cart._id, productId });
    if (cartProduct) {
      cartProduct.quantity += quantity;
    } else {
      cartProduct = new CartProduct({
        cartId: cart._id,
        productId,
        quantity,
        price: product.price,
      });
    }
    await cartProduct.save();

    const cartProducts = await CartProduct.find({ cartId: cart._id });
    const totalPrice = cartProducts.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.toString());
      return total + itemPrice * item.quantity;
    }, 0);

    cart.totalPrice = totalPrice;
    await CartRepository.save(cart);

    const orderProduct = new OrderProduct({
      userId,
      cartId: cart._id,
      productId,
      quantity,
      price: product.price,
    });
    await orderProduct.save();

    return cart;
  }

  /**
   * Retrieves all cart items for a specific user by userId.
   * @param userId - The ID of the user to retrieve cart items for.
   * @returns The user's cart with populated product details, or an error if not found.
   */
  async getAllCartItems(userId: Types.ObjectId) {
    const cart = await CartRepository.findByUserId(userId);
    if (!cart) {
      throw new ApiError(404, "Cart not found for this user");
    }

    const cartProducts = await CartRepository.findCartProducts(cart._id as Types.ObjectId);
    if (!cartProducts.length) {
      throw new ApiError(404, "Cart is empty for this user");
    }

    const totalPrice = cartProducts.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.toString());
      return total + itemPrice * item.quantity;
    }, 0);

    await CartRepository.updateTotalPrice(cart._id as Types.ObjectId, totalPrice);

    return { ...cart.toObject(), items: cartProducts };
  }
}

export default new CartService();
