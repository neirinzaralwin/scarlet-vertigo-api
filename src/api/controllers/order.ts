import { Request, Response, NextFunction } from "express";
import OrderService from "../../domain/services/order.service";
import { IOrder } from "../../infrastructure/models/order";

class OrderController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orderData: IOrder = req.body;
      const newOrder = await OrderService.create(orderData);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const orders = await OrderService.findAll();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const order = await OrderService.findById(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const orderData: Partial<IOrder> = req.body;
      const updatedOrder = await OrderService.update(id, orderData);
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await OrderService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
