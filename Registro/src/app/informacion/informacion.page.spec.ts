import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacionPage } from './informacion.page';

describe('InformacionPage', () => {
  let component: InformacionPage;
  let fixture: ComponentFixture<InformacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InformacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
