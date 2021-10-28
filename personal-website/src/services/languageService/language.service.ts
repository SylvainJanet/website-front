import { SupportedLanguages } from './../../constants/languages/supportedLanguages';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  static currentLanguage: SupportedLanguages;
  constructor() {
    LanguageService.currentLanguage = SupportedLanguages.FRENCH;
  }

  getCurrentLanguage() {
    return LanguageService.currentLanguage;
  }

  setCurrentLanguage(language: SupportedLanguages) {
    LanguageService.currentLanguage = language;
  }
}
