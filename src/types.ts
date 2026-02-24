export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Listing {
  id: number;
  name: string;
  category_id: number;
  category_name: string;
  rating: number;
  reviews_count: number;
  address: string;
  phone: string;
  image: string;
  is_verified: boolean;
}
