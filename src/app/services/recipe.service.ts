import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize, map, of, switchMap, tap } from 'rxjs';
import { API_BASE_URL } from '../core/api.config';
import { RecipeApi } from '../models/recipe-api.model';
import { Recipe } from '../models/recipe.model';
import { adaptRecipeFromApi } from '../adapters/recipe.adapter';

export interface SearchCriteria {
  term: string;
  category: string;
}

export interface CreateRecipePayload {
  title: string;
  description: string;
  category: string;
  prepTimeMinutes: number;
  difficulty: string;
  featured: boolean;
}

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_BASE_URL}/recipes`;

  private readonly searchTrigger$ = new BehaviorSubject<SearchCriteria>({
    term: '',
    category: ''
  });

  private lastCriteria: SearchCriteria = { term: '', category: '' };

  readonly recipes = signal<Recipe[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  constructor() {
    this.searchTrigger$
      .pipe(
        tap((criteria) => {
          this.lastCriteria = { ...criteria };
          this.loading.set(true);
          this.error.set(null);
        }),
        switchMap((criteria) => this.fetchAdaptedRecipes(criteria))
      )
      .subscribe({
        next: (items) => {
          this.recipes.set(items);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudieron cargar las recetas desde la API.');
          this.loading.set(false);
        }
      });
  }

  searchRecipes(criteria: SearchCriteria): void {
    this.searchTrigger$.next(criteria);
  }

  retryLastQuery(): void {
    this.searchTrigger$.next({ ...this.lastCriteria });
  }

  createRecipe(input: CreateRecipePayload): Observable<Recipe> {
    this.loading.set(true);
    this.error.set(null);

    const body: RecipeApi = {
      title: input.title.trim(),
      summary: input.description.trim(),
      category: input.category.trim().toLowerCase(),
      calories: Number(input.prepTimeMinutes),
      difficulty: input.difficulty.trim().toLowerCase(),
      prepDate: new Date().toISOString().slice(0, 10),
      isFavorite: input.featured
    };

    return this.http.post<RecipeApi>(this.apiUrl, body).pipe(
      map((createdRaw) => adaptRecipeFromApi(createdRaw)),
      tap((createdRecipe) => {
        this.recipes.update((list) => [createdRecipe, ...list]);
      }),
      catchError((err) => {
        this.error.set('Error al crear la receta en la API.');
        throw err;
      }),
      finalize(() => this.loading.set(false))
    );
  }

  checkTermExistsInApi(term: string): Observable<boolean> {
    const clean = term.trim().toLowerCase();
    if (!clean) {
      return of(true);
    }

    return this.http.get<RecipeApi[]>(this.apiUrl).pipe(
      map((items) =>
        items.some(
          (item) =>
            (item.title ?? '').toLowerCase().includes(clean) ||
            (item.summary ?? '').toLowerCase().includes(clean)
        )
      ),
      catchError(() => of(true))
    );
  }

  private fetchAdaptedRecipes(criteria: SearchCriteria): Observable<Recipe[]> {
    let params = new HttpParams();
    if (criteria.category.trim()) {
      params = params.set('category', criteria.category.trim().toLowerCase());
    }

    const cleanTerm = criteria.term.trim().toLowerCase();

    return this.http.get<RecipeApi[]>(this.apiUrl, { params }).pipe(
      map((rawItems) => rawItems.map(adaptRecipeFromApi)),
      map((adapted) => {
        if (!cleanTerm) {
          return adapted;
        }
        return adapted.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(cleanTerm) ||
            recipe.description.toLowerCase().includes(cleanTerm)
        );
      }),
      catchError(() => {
        this.error.set('No se pudo conectar con la API local (json-server).');
        this.loading.set(false);
        return of([]);
      })
    );
  }
}