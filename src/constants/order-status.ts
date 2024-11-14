export const ORDER_STATUS = {
    pending: "Pending",
    confirmed: "Confirmed",
    rejected: "Rejected",
    refunded: "Refunded",
    delivered: "Delivered",
  } as const;
  
  export type OrderStatusType = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];
  
  export interface Order {
    id: string;
    status: OrderStatusType;
  }
  