export interface Product {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  isFeatured: boolean;
  customTitle?: string;
  displayNumber?: number;
}