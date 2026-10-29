import { TestBed } from '@angular/core/testing';
import { RecipeListComponent } from './recipe-list.component';

describe('RecipeListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeListComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RecipeListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
