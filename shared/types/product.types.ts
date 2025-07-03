export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  images: ProductImage[];
  fragrance: FragranceProfile;
  volume: ProductVolume[];
  stock: number;
  category: ProductCategory;
  tags: string[];
  features: string[];
  isNew: boolean;
  isBestseller: boolean;
  isLimited: boolean;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface FragranceProfile {
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  sillage: 'soft' | 'moderate' | 'heavy' | 'enormous';
  longevity: 'poor' | 'weak' | 'moderate' | 'long lasting' | 'eternal';
  season: ('spring' | 'summer' | 'autumn' | 'winter')[];
  occasion: string[];
}

export interface ProductVolume {
  id: string;
  volume: number; // in ml
  price: number;
  stock: number;
  isDefault: boolean;
}

export enum ProductCategory {
  POUR_FEMME = 'pour_femme',
  POUR_HOMME = 'pour_homme',
  UNISEX = 'unisex',
  EXCLUSIVE = 'exclusive',
  LIMITED = 'limited',
  DISCOVERY = 'discovery'
}

export interface ProductFilter {
  category?: ProductCategory[];
  priceRange?: {
    min: number;
    max: number;
  };
  volume?: number[];
  tags?: string[];
  fragrance?: {
    notes?: string[];
    sillage?: string[];
    longevity?: string[];
  };
  availability?: 'all' | 'in_stock' | 'out_of_stock';
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest' | 'bestseller' | 'rating';
}

// Produktvarianten für Liyana Nour
export const LIYANA_NOUR_PRODUCTS = [
  'Liyana Nour Rouge',
  'Liyana Nour Intense', 
  'Liyana Nour Blanc',
  'Liyana Nour Noir',
  'Liyana Nour Gold',
  'Liyana Nour Rose',
  'Liyana Nour Oud',
  'Liyana Nour Velvet',
  'Liyana Nour Crystal',
  'Liyana Nour Mystique',
  'Liyana Nour Elixir',
  'Liyana Nour Absolue',
  'Liyana Nour Prive',
  'Liyana Nour Sport',
  'Liyana Nour Fresh',
  'Liyana Nour Oriental',
  'Liyana Nour Exclusive',
  'Liyana Nour Limited Edition',
  'Liyana Nour Anniversary',
  'Liyana Nour Discovery Set'
] as const;

export type LiyanaNourProduct = typeof LIYANA_NOUR_PRODUCTS[number];