import { TestBed } from '@angular/core/testing';
import { RecipeFilterComponent } from './recipe-filter.component';

describe('RecipeFilterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeFilterComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RecipeFilterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
