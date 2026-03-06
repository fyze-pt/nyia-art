export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}
