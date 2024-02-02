// theme.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkThemeSubject = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkThemeSubject.asObservable();

  toggleTheme(): void {
    const isDarkTheme = !this.isDarkThemeSubject.value;
    this.isDarkThemeSubject.next(isDarkTheme);
    this.updateTheme(isDarkTheme);
  }

  private updateTheme(isDarkTheme: boolean): void {
    const themeClassName = isDarkTheme ? 'dark-theme' : 'light-theme';
    document.body.classList.add(themeClassName);
    document.body.classList.remove(isDarkTheme ? 'light-theme' : 'dark-theme');
  }
}
