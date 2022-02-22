class CartItem {
  productId: string;
  quantity: number;
  productPrice: number;
  productTitle: string;
  totalSum: number;

  constructor(
    productId: string,
    productTitle: string,
    productPrice: number,
    quantity: number,
    totalSum: number
  ) {
    this.productTitle = productTitle;
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.totalSum = totalSum;
    this.productId = productId;
  }
}

export default CartItem;
