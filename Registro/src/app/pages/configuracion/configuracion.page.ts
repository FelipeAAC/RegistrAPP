import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage {

  enableNotifications: boolean;
  selectedLanguage: string;
  darkMode: boolean;

  constructor() {
    this.enableNotifications = localStorage.getItem('enableNotifications') === 'true';
    this.selectedLanguage = localStorage.getItem('selectedLanguage') ?? 'es';
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.applyTheme(); // Llamamos a esta función al iniciar
  }

  saveSettings() {
    localStorage.setItem('enableNotifications', this.enableNotifications.toString());
    localStorage.setItem('selectedLanguage', this.selectedLanguage);
    localStorage.setItem('darkMode', this.darkMode.toString());
    this.applyTheme(); // Llamamos a esta función después de guardar
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.saveSettings();
  }

  private applyTheme() {
    const theme = this.darkMode ? 'dark' : 'light';
    document.body.setAttribute('color-theme', theme);
  }
}
