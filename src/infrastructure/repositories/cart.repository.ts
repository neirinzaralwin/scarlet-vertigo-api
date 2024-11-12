import Cart, { ICart } from '../../infrastructure/models/cart';
import { Types } from "mongoose";

class CartRepository {
  /**
   * Creates a new cart with the provided data.
   * @param cartData - Partial data to create a new cart
   * @returns A promise that resolves to the saved cart document
   */
  async create(cartData: Partial<ICart>): Promise<ICart> {
    const cart = new Cart(cartData);
    return await cart.save();
  }

  /**
   * Finds a cart by user ID.
   * @param userId - The ID of the user whose cart to find
   * @returns A promise that resolves to the user's cart or null if not found
   */
  async findByUserId(userId: Types.ObjectId): Promise<ICart | null> {
    return await Cart.findOne({ userId });
  }

  /**
   * Saves an existing cart document.
   * @param cart - The cart document to be saved
   * @returns A promise that resolves to the saved cart document
   */
  async save(cart: ICart): Promise<ICart> {
    return await cart.save();
  }
}

export default new CartRepository();
