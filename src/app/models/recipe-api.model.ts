export interface RecipeApi {
  id?: string | number;
  title?: string;
  summary?: string;
  category?: string;
  prepDate?: string;
  difficulty?: string;
  calories?: number | string;
  isFavorite?: boolean;
}