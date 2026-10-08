export type ProductCategory = 
  | 'Buket Bunga' 
  | 'Papan Bunga' 
  | 'Bunga Meja' 
  | 'Bunga Duka Cita';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  description: string;
  image: string;
  featured?: boolean;
  flowerTypes?: string[];
  dimensions?: string;
  careTips?: string;
}

export interface GreetingCardData {
  to: string;
  message: string;
  from: string;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  quantity: number;
  ribbonColor: string;
  greetingCard: GreetingCardData;
}

export type OrderStatus = 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan';

export type PaymentMethod = 
  | 'Transfer Bank BCA' 
  | 'Transfer Bank Mandiri' 
  | 'QRIS Instant' 
  | 'COD (Bayar di Tempat)';

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryDate: string;
  deliveryTimeSlot?: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
}
