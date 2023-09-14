import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CargaPage } from './carga.page';

describe('CargaPage', () => {
  let component: CargaPage;
  let fixture: ComponentFixture<CargaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});