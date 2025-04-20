import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlacesListPage } from './places-list.page';

describe('PlacesListPage', () => {
  let component: PlacesListPage;
  let fixture: ComponentFixture<PlacesListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
