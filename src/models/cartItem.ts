class CartItem {
  quantity: number;
  productPrice: number;
  productTitle: string;
  totalSum: number;

  constructor(
    quantity: number,
    productPrice: number,
    productTitle: string,
    totalSum: number
  ) {
    this.productTitle = productTitle;
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.totalSum = totalSum;
  }
}

export default CartItem;
