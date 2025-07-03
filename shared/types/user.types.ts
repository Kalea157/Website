export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: UserRole;
  preferences: UserPreferences;
  addresses: Address[];
  consents: UserConsents;
  voiceProfile?: VoiceProfile;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isActive: boolean;
  isVerified: boolean;
}

export enum UserRole {
  GUEST = 'guest',
  CUSTOMER = 'customer',
  VIP = 'vip',
  ADMIN = 'admin'
}

export interface UserPreferences {
  language: string;
  currency: string;
  newsletter: boolean;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  accessibility: {
    voiceControl: boolean;
    highContrast: boolean;
    largeText: boolean;
    screenReader: boolean;
  };
}

export interface Address {
  id: string;
  type: 'billing' | 'shipping';
  isDefault: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  streetNumber: string;
  additional?: string;
  postalCode: string;
  city: string;
  state?: string;
  country: string;
  phone?: string;
}

export interface UserConsents {
  privacy: ConsentRecord;
  marketing: ConsentRecord;
  cookies: ConsentRecord;
  dataProcessing: ConsentRecord;
  voiceRecording?: ConsentRecord;
}

export interface ConsentRecord {
  given: boolean;
  timestamp: Date;
  version: string;
  ip?: string;
  method: 'click' | 'voice' | 'form';
}

export interface VoiceProfile {
  id: string;
  isEnabled: boolean;
  voiceId?: string;
  preferredSpeed: number;
  preferredPitch: number;
  language: string;
  lastUsed?: Date;
  commands: VoiceCommand[];
}

export interface VoiceCommand {
  phrase: string;
  action: string;
  confidence: number;
  customized: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  consents: {
    privacy: boolean;
    marketing?: boolean;
  };
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}