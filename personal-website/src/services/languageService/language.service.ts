import { SupportedLanguage } from '../../constants/languages/supportedLanguage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  static currentLanguage: SupportedLanguage;
  constructor() {
    LanguageService.currentLanguage = SupportedLanguage.FRENCH;
  }

  getCurrentLanguage() {
    return LanguageService.currentLanguage;
  }

  setCurrentLanguage(language: SupportedLanguage) {
    LanguageService.currentLanguage = language;
  }
}
