export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay',
  SOFORT = 'sofort',
  KLARNA = 'klarna',
  CRYPTO = 'crypto',
  BANK_TRANSFER = 'bank_transfer',
  DIRECT_DEBIT = 'direct_debit',
  CASH_ON_DELIVERY = 'cash_on_delivery'
}

export interface PaymentDetails {
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  transactionId?: string;
  metadata?: Record<string, any>;
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

export interface CreditCardDetails {
  last4: string;
  brand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'other';
  expMonth: number;
  expYear: number;
  holderName: string;
}

export interface PayPalDetails {
  email: string;
  payerId?: string;
  orderId?: string;
}

export interface CryptoPaymentDetails {
  currency: 'BTC' | 'ETH' | 'USDT' | 'USDC';
  walletAddress: string;
  transactionHash?: string;
  network?: string;
  amount: number;
  exchangeRate?: number;
}

export interface BankTransferDetails {
  iban?: string;
  bic?: string;
  accountHolder: string;
  bankName?: string;
  reference: string;
}

export interface KlarnaDetails {
  klarnaId: string;
  paymentOption: 'pay_later' | 'pay_now' | 'slice_it';
}

export interface CashOnDeliveryDetails {
  deliveryFee: number;
  prepaidAmount: number;
  remainingAmount: number;
  paymentDue: Date;
  specialInstructions?: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  clientSecret?: string;
  metadata?: {
    orderId: string;
    customerId?: string;
    cartId: string;
  };
  createdAt: Date;
  expiresAt?: Date;
}

export interface PaymentError {
  code: string;
  message: string;
  details?: any;
  recoverable: boolean;
}

export interface PaymentWebhook {
  id: string;
  type: string;
  provider: string;
  event: string;
  data: any;
  signature?: string;
  timestamp: Date;
}