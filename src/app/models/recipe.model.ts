export interface Recipe {
  id: number;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  prepTimeMinutes: number; 
  featured?: boolean;
}
