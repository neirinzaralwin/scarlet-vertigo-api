import Cart, { ICart } from "../models/cart/cart";
import CartProduct from "../models/cart/cart-product";
import { Types } from "mongoose";

class CartRepository {
  /**
   * Creates a new cart with the provided data.
   * @param cartData - Partial data to create a new cart.
   * @returns A promise that resolves to the saved cart document.
   */
  async create(cartData: Partial<ICart>): Promise<ICart> {
    const cart = new Cart(cartData);
    return await cart.save();
  }

  /**
   * Finds a cart by user ID.
   * @param userId - The ID of the user whose cart to find.
   * @returns A promise that resolves to the user's cart or null if not found.
   */
  async findByUserId(userId: Types.ObjectId): Promise<ICart | null> {
    return await Cart.findOne({ userId });
  }

  /**
   * Finds all products in a specific cart.
   * @param cartId - The ID of the cart to find products for.
   * @returns A promise that resolves to an array of cart products.
   */
  async findCartProducts(cartId: Types.ObjectId) {
    return await CartProduct.find({ cartId }).populate(
      "productId",
      "product_uid name price"
    );
  }

  /**
   * Updates the total price of the specified cart based on its items.
   * @param cartId - The ID of the cart to update.
   * @param totalPrice - The calculated total price to set.
   * @returns A promise that resolves to the updated cart document.
   */
  async updateTotalPrice(cartId: Types.ObjectId, totalPrice: number): Promise<ICart | null> {
    return await Cart.findByIdAndUpdate(
      cartId,
      { totalPrice },
      { new: true }
    );
  }

  /**
   * Finds a specific product in a cart.
   * @param cartId - The ObjectId of the cart.
   * @param productId - The ObjectId of the product to find.
   * @returns The cart product document or null if not found.
   */
  async findCartItem(cartId: Types.ObjectId, productId: Types.ObjectId) {
    return await CartProduct.findOne({ cartId, productId });
  }

  /**
   * Removes a specific product from a cart.
   * @param cartId - The ObjectId of the cart.
   * @param productId - The ObjectId of the product to remove.
   * @returns A promise that resolves to the removed cart product document or null if not found.
   */
  async removeCartItem(cartId: Types.ObjectId, productId: Types.ObjectId): Promise<any> {
    return await CartProduct.findOneAndDelete({ cartId, productId });
  }
}

export default new CartRepository();
