import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CargaPage } from './carga.page';

describe('CargaPage', () => {
  let component: CargaPage;
  let fixture: ComponentFixture<CargaPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(CargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});