import Order, { IOrder } from '../models/order';

class OrderRepository {
  async create(orderData: IOrder): Promise<IOrder> {
    const order = new Order(orderData);
    return await order.save();
  }

  async findAll(): Promise<IOrder[]> {
    return await Order.find();
  }

  async findById(id: string): Promise<IOrder | null> {
    return await Order.findById(id);
  }

  async update(id: string, orderData: Partial<IOrder>): Promise<IOrder | null> {
    return await Order.findByIdAndUpdate(id, orderData, { new: true });
  }

  async delete(id: string): Promise<IOrder | null> {
    return await Order.findByIdAndDelete(id);
  }
}

export default new OrderRepository();
