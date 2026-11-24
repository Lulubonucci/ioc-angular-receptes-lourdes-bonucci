import { RecipeApi } from '../models/recipe-api.model';
import { Recipe } from '../models/recipe.model';

export function adaptRecipeFromApi(raw: RecipeApi): Recipe {
  const title = (raw.title ?? '').trim() || 'Receta sin título';
  const description = (raw.summary ?? '').trim() || 'Sin descripción disponible.';
  const category = (raw.category ?? 'general').trim().toLowerCase() || 'general';
  const difficulty = (raw.difficulty ?? 'media').trim().toLowerCase() || 'media';

  const parsedMinutes = Number(raw.calories);
  const prepTimeMinutes =
    Number.isFinite(parsedMinutes) && parsedMinutes >= 0 ? parsedMinutes : 0;

  const dateCandidate = raw.prepDate ? new Date(raw.prepDate) : new Date();
  const createdAt = Number.isNaN(dateCandidate.getTime())
    ? new Date().toISOString().slice(0, 10)
    : dateCandidate.toISOString().slice(0, 10);

  return {
    id: raw.id !== undefined ? String(raw.id).trim() : crypto.randomUUID(),
    title,
    description,
    category,
    createdAt,
    prepTimeMinutes,
    featured: Boolean(raw.isFavorite),
    difficulty
  };
}