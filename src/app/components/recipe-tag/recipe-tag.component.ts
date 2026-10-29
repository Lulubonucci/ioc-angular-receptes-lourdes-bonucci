import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-tag',
  standalone: true,
  imports: [],
  templateUrl: './recipe-tag.component.html',
  styleUrl: './recipe-tag.component.scss'
})
export class RecipeTagComponent {
  @Input({ required: true }) category!: string;
}
