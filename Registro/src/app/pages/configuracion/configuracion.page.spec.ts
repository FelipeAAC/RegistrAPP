import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguracionPage } from './configuracion.page';

describe('ConfiguracionPage', () => {
  let component: ConfiguracionPage;
  let fixture: ComponentFixture<ConfiguracionPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(ConfiguracionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});