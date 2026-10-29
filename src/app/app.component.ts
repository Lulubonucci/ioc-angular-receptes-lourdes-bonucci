import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from './models/recipe.model';
import { RECIPES_MOCK } from './data/recipes.mock';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import {
  RecipeFilterComponent,
  FilterCriteria,
} from './components/recipe-filter/recipe-filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RecipeListComponent, RecipeFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'App de Recetas';
  allRecipes: Recipe[] = RECIPES_MOCK;
  filteredRecipes: Recipe[] = [...RECIPES_MOCK];
  selectedRecipe: Recipe | null = null;

  categories: string[] = Array.from(new Set(RECIPES_MOCK.map((r) => r.category)));

  onFilter(criteria: FilterCriteria): void {
    this.filteredRecipes = this.allRecipes.filter((recipe) => {
      const search = criteria.searchText ? criteria.searchText.toLowerCase().trim() : '';

      // Busca en título, descripción y categoría
      const matchesText = search
        ? recipe.title.toLowerCase().includes(search) ||
          recipe.description.toLowerCase().includes(search) ||
          recipe.category.toLowerCase().includes(search)
        : true;

      const matchesCategory = criteria.category ? recipe.category === criteria.category : true;

      return matchesText && matchesCategory;
    });
  }

  onResetFilter(): void {
    this.filteredRecipes = [...this.allRecipes];
  }

  onSelectRecipe(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }
}
