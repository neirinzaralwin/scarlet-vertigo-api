import orderRepository from "../../../infrastructure/repositories/order.respository";
import { IOrder } from "../../../infrastructure/models/order/order";

class OrderService {
  async create(orderData: IOrder): Promise<IOrder> {
    return await orderRepository.create(orderData);
  }

  async findAll(): Promise<IOrder[]> {
    return await orderRepository.findAll();
  }

  async findById(id: string): Promise<IOrder> {
    const order = await orderRepository.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }

  async update(id: string, orderData: Partial<IOrder>): Promise<IOrder> {
    const updatedOrder = await orderRepository.update(id, orderData);
    if (!updatedOrder) {
      throw new Error("Order not found");
    }
    return updatedOrder;
  }

  async delete(id: string): Promise<IOrder> {
    const deletedOrder = await orderRepository.delete(id);
    if (!deletedOrder) {
      throw new Error("Order not found");
    }
    return deletedOrder;
  }
}

export default new OrderService();
