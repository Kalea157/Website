import { Product, ProductVolume } from './product.types';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  volumeId: string;
  volume: ProductVolume;
  quantity: number;
  price: number;
  discountPrice?: number;
  subtotal: number;
  addedAt: Date;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId: string;
  items: CartItem[];
  subtotal: number;
  discount: CartDiscount | null;
  shipping: ShippingInfo | null;
  tax: number;
  total: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartDiscount {
  code?: string;
  type: 'percentage' | 'fixed' | 'shipping' | 'gift';
  value: number;
  description: string;
  conditions?: DiscountCondition[];
  appliedAmount: number;
}

export interface DiscountCondition {
  type: 'min_amount' | 'min_items' | 'specific_products' | 'category';
  value: number | string | string[];
  met: boolean;
}

export interface ShippingInfo {
  method: ShippingMethod;
  cost: number;
  estimatedDays: number;
  trackingNumber?: string;
  carrier?: string;
}

export enum ShippingMethod {
  STANDARD = 'standard',
  EXPRESS = 'express',
  OVERNIGHT = 'overnight',
  PICKUP = 'pickup',
  CASH_ON_DELIVERY = 'cash_on_delivery'
}

export interface CartPromotion {
  id: string;
  threshold: number;
  type: 'free_shipping' | 'gift' | 'discount';
  value: string | number;
  description: string;
  active: boolean;
}

// Rabattlogik-Konstanten
export const DISCOUNT_RULES = {
  FREE_SHIPPING_THRESHOLD: 50, // EUR
  GIFT_SAMPLE_THRESHOLD_1: 75, // EUR
  GIFT_SAMPLE_THRESHOLD_2: 105, // EUR
  CASH_ON_DELIVERY_FEE_RANGE: {
    min: 10,
    max: 20
  }
} as const;

export interface CartUpdateRequest {
  action: 'add' | 'update' | 'remove' | 'clear';
  productId?: string;
  volumeId?: string;
  quantity?: number;
  itemId?: string;
}