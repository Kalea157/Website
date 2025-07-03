import { CartItem, ShippingInfo } from './cart.types';
import { PaymentDetails } from './payment.types';
import { Address } from './user.types';

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerEmail: string;
  customerPhone?: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  shipping: ShippingInfo;
  payment: PaymentDetails;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  currency: string;
  notes?: string;
  metadata?: OrderMetadata;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  cancelledAt?: Date;
}

export interface OrderItem extends CartItem {
  orderId: string;
  status: OrderItemStatus;
  fulfilledQuantity: number;
  returnedQuantity: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  FAILED = 'failed'
}

export enum OrderItemStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  RETURNED = 'returned',
  CANCELLED = 'cancelled'
}

export interface OrderMetadata {
  source: 'web' | 'mobile' | 'voice' | 'admin';
  ip?: string;
  userAgent?: string;
  referrer?: string;
  giftMessage?: string;
  isGift: boolean;
  voiceOrderDetails?: VoiceOrderDetails;
  promotions?: string[];
}

export interface VoiceOrderDetails {
  sessionId: string;
  duration: number;
  commandsUsed: string[];
  recognitionConfidence: number;
}

export interface OrderStatusUpdate {
  orderId: string;
  status: OrderStatus;
  reason?: string;
  notify: boolean;
  updatedBy: string;
  timestamp: Date;
}

export interface OrderTracking {
  orderId: string;
  carrier: string;
  trackingNumber: string;
  trackingUrl: string;
  events: TrackingEvent[];
  estimatedDelivery?: Date;
  actualDelivery?: Date;
}

export interface TrackingEvent {
  timestamp: Date;
  status: string;
  location?: string;
  description: string;
}

export interface OrderReturn {
  id: string;
  orderId: string;
  items: OrderReturnItem[];
  reason: string;
  status: ReturnStatus;
  refundAmount: number;
  createdAt: Date;
  processedAt?: Date;
  notes?: string;
}

export interface OrderReturnItem {
  orderItemId: string;
  quantity: number;
  reason: string;
  condition: 'unopened' | 'opened' | 'damaged';
}

export enum ReturnStatus {
  REQUESTED = 'requested',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SHIPPED = 'shipped',
  RECEIVED = 'received',
  PROCESSING = 'processing',
  REFUNDED = 'refunded',
  COMPLETED = 'completed'
}