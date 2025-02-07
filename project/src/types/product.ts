export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  type: 'local' | 'foreign';
  image: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'popularity';
export type FilterType = 'all' | 'local' | 'foreign';