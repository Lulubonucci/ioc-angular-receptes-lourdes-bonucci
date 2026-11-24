export interface Recipe {
  id: number | string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  prepTimeMinutes: number;
  featured?: boolean;
  difficulty?: string;
}
