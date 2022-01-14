import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavemyfavoritesComponent } from './savemyfavorites.component';

describe('SavemyfavoritesComponent', () => {
  let component: SavemyfavoritesComponent;
  let fixture: ComponentFixture<SavemyfavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavemyfavoritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavemyfavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
