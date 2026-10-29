import { TestBed } from '@angular/core/testing';
import { RecipeTagComponent } from './recipe-tag.component';

describe('RecipeTagComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeTagComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RecipeTagComponent);
    const component = fixture.componentInstance;
    component.category = 'Test';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
