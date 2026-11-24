import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RecipeService } from '../services/recipe.service';

export function recipeTermApiValidator(recipeService: RecipeService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = String(control.value ?? '').trim();
    if (value.length < 3) {
      return of(null);
    }

    return timer(200).pipe(
      switchMap(() => recipeService.checkTermExistsInApi(value)),
      map((exists) => (exists ? null : { noApiMatches: true })),
      catchError(() => of(null))
    );
  };
}