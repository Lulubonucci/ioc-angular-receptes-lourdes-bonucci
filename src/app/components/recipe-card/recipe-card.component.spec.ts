import { TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card.component';

describe('RecipeCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCardComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RecipeCardComponent);
    const component = fixture.componentInstance;
    component.recipe = {
      id: 1,
      title: 'Test',
      description: 'Test',
      category: 'Test',
      createdAt: '2026-01-01',
      prepTimeMinutes: 10
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
