class Order {
  id: string;
  items: [];
  date: string;
  totalAmount: number;

  constructor(id: string, items: [], date: string, totalAmount: number) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
}

export default Order;
