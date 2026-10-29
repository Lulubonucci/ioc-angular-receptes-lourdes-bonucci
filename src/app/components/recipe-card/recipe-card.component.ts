import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeTagComponent } from '../recipe-tag/recipe-tag.component';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RecipeTagComponent],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe!: Recipe;
  @Output() selectRecipe = new EventEmitter<Recipe>();

  onSelect(): void {
    this.selectRecipe.emit(this.recipe);
  }
}
