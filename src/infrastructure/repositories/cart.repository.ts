import Cart, { ICart } from "../../infrastructure/models/cart";
import CartProduct from "../../infrastructure/models/cart-product";
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
   * Saves an existing cart document.
   * @param cart - The cart document to be saved.
   * @returns A promise that resolves to the saved cart document.
   */
  async save(cart: ICart): Promise<ICart> {
    return await cart.save();
  }

  /**
   * Finds all carts in the collection.
   * @returns A promise that resolves to an array of all cart documents.
   */
  async findAll(): Promise<ICart[]> {
    return await Cart.find();
  }

  /**
   * Finds all products in a specific cart.
   * @param cartId - The ID of the cart to find products for.
   * @returns A promise that resolves to an array of cart products.
   */
  async findCartProducts(cartId: Types.ObjectId) {
    return await CartProduct.find({ cartId }).populate(
      "productId",
      "product_uid name price" // Populate with the required product fields
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
}

export default new CartRepository();
