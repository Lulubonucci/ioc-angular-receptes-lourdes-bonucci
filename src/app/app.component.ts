import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RecipeService } from './services/recipe.service';
import { SearchHistoryService } from './services/search-history.service';
import { recipeTermApiValidator } from './validators/recipe-term.validator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly recipeService = inject(RecipeService);
  readonly historyService = inject(SearchHistoryService);

  readonly postSuccessMessage = signal<string | null>(null);

  readonly searchForm = this.fb.group({
    term: [
      '',
      [Validators.minLength(3)],
      [recipeTermApiValidator(this.recipeService)]
    ],
    category: ['']
  });

  readonly createForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    category: ['desayuno', [Validators.required]],
    prepTimeMinutes: [15, [Validators.required, Validators.min(1)]],
    difficulty: ['facil', [Validators.required]],
    featured: [false]
  });

  ngOnInit(): void {
    this.searchForm
      .get('term')
      ?.valueChanges.pipe(debounceTime(350), distinctUntilChanged())
      .subscribe(() => {
        this.emitSearchIfValid();
      });

    this.searchForm.get('category')?.valueChanges.subscribe(() => {
      this.emitSearchIfValid();
    });
  }

  onSearchSubmit(): void {
    const termControl = this.searchForm.get('term');
    if (termControl?.invalid) {
      termControl.markAsTouched();
      return;
    }

    const term = String(this.searchForm.value.term ?? '').trim();
    const category = String(this.searchForm.value.category ?? '').trim();

    if (term.length >= 3) {
      this.historyService.addTerm(term);
    }

    this.recipeService.searchRecipes({ term, category });
  }

  emitSearchIfValid(): void {
    const termControl = this.searchForm.get('term');
    if (termControl?.invalid) {
      return;
    }

    const term = String(this.searchForm.value.term ?? '').trim();
    const category = String(this.searchForm.value.category ?? '').trim();

    this.recipeService.searchRecipes({ term, category });
  }

  clearSearch(): void {
    this.searchForm.reset({ term: '', category: '' });
    this.recipeService.searchRecipes({ term: '', category: '' });
  }

  selectFromHistory(term: string): void {
    const cleanTerm = term.trim();
    this.searchForm.patchValue({ term: cleanTerm });
    this.searchForm.get('term')?.markAsTouched();
    this.historyService.addTerm(cleanTerm);

    this.recipeService.searchRecipes({
      term: cleanTerm,
      category: String(this.searchForm.value.category ?? '').trim()
    });
  }

  onRetry(): void {
    this.recipeService.retryLastQuery();
  }

  onCreateRecipe(): void {
    this.postSuccessMessage.set(null);
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const raw = this.createForm.getRawValue();
    this.recipeService
      .createRecipe({
        title: String(raw.title ?? ''),
        description: String(raw.description ?? ''),
        category: String(raw.category ?? 'general'),
        prepTimeMinutes: Number(raw.prepTimeMinutes ?? 10),
        difficulty: String(raw.difficulty ?? 'facil'),
        featured: Boolean(raw.featured)
      })
      .subscribe({
        next: (created) => {
          this.postSuccessMessage.set(`Receta "${created.title}" creada correctamente.`);
          this.createForm.reset({
            title: '',
            description: '',
            category: 'desayuno',
            prepTimeMinutes: 15,
            difficulty: 'facil',
            featured: false
          });
        }
      });
  }
}
