import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterCriteria {
  searchText: string;
  category: string;
}

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-filter.component.html',
  styleUrl: './recipe-filter.component.scss'
})
export class RecipeFilterComponent {
  @Input() categories: string[] = [];
  @Output() filterChange = new EventEmitter<FilterCriteria>();
  @Output() resetFilter = new EventEmitter<void>();

  searchText: string = '';
  selectedCategory: string = '';

  onApplyFilter(): void {
    this.filterChange.emit({
      searchText: this.searchText,
      category: this.selectedCategory
    });
  }

  onReset(): void {
    this.searchText = '';
    this.selectedCategory = '';
    this.resetFilter.emit();
  }
}
