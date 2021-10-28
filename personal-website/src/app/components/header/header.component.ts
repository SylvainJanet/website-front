import { WebsiteMainMenuItemService } from './../../../services/websiteMainMenuItemService/website-main-menu-item-service.service';
import { SupportedLanguages } from './../../../constants/languages/supportedLanguages';
import { WebsiteMainMenuItem } from './../../../model/websiteMainMenuItem';
import { LanguageService } from './../../../services/languageService/language.service';
import { LogService } from './../../../services/log/log.service';
import { WebsiteMainMenuDto } from './../../../interfaces/websiteMainMenuDto';
import { WebsiteMainMenuService } from './../../../services/websiteMainMenuService/website-main-menu.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebsiteMainMenu } from 'src/model/websiteMainMenu';
import { WebpageCategoryMain } from 'src/model/webpageCategoryMain';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menu: WebsiteMainMenu = new WebsiteMainMenu();
  log: LogService;
  otherLanguages: SupportedLanguages[];
  @Output() changeMenuItem = new EventEmitter<WebpageCategoryMain>();
  allItems: WebsiteMainMenuItem[] = [];
  subsubMenuOpen: Boolean = false;

  constructor(
    private websiteMainMenuService: WebsiteMainMenuService,
    private logService: LogService,
    private languageService: LanguageService,
    private websiteMainMenuItemService: WebsiteMainMenuItemService
  ) {
    this.log = logService.withClassName(HeaderComponent.name);
    this.otherLanguages = [];
    this.updateDisplay();
    websiteMainMenuService.getAll().subscribe((m) => {
      if (m.entities) {
        this.log.debug('entities', m);
        this.menu = WebsiteMainMenu.convertToEntity(m.entities[0]);
      }
    });
    websiteMainMenuItemService.getAll().subscribe((m) => {
      if (m.entities) {
        this.log.debug('entities', m);
        this.allItems = WebsiteMainMenuItem.convertListToEntity(m.entities);
      }
    });
  }

  enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
  }

  updateDisplay() {
    this.otherLanguages = [];
    for (const value of this.enumKeys(SupportedLanguages)) {
      if (this.currentLanguage() != SupportedLanguages[value]) {
        this.otherLanguages.push((<any>SupportedLanguages)[value]);
      }
    }
  }

  ngOnInit(): void {}

  currentLanguage(): SupportedLanguages {
    return this.languageService.getCurrentLanguage();
  }

  getTitle(item: WebsiteMainMenuItem) {
    return item.languagedTitle.strings.get(this.currentLanguage());
  }

  changeLanguage(language: SupportedLanguages) {
    this.languageService.setCurrentLanguage(language);
    this.updateDisplay();
  }

  categoryClick(item: WebsiteMainMenuItem) {
    for (let it of this.allItems) {
      if (it && it.id && it.id == item.id) {
        item = it;
      }
    }
    console.log(item.webpageCategoryMain);
    this.changeMenuItem.emit(item.webpageCategoryMain);
  }

  getActualMainMenuItem(el: WebsiteMainMenuItem): WebsiteMainMenuItem {
    for (let item of this.allItems) {
      if (item.id && item.id == el.id) {
        return item;
      }
    }
    return new WebsiteMainMenuItem();
  }

  getTitleById(el: WebsiteMainMenuItem): string | undefined | null {
    for (let item of this.allItems) {
      if (item.id && item.id == el.id) {
        return item.languagedTitle.strings.get(this.currentLanguage());
      }
    }
    return null;
  }

  subItems(el: WebsiteMainMenuItem) {
    let res = [];
    let properEl = new WebsiteMainMenuItem();
    for (let item of this.allItems) {
      if (item.id && item.id == el.id) {
        properEl = item;
      }
    }
    for (let item of this.allItems) {
      if (
        item.id &&
        properEl.subitems.map((wmmi) => wmmi.id).includes(item.id)
      ) {
        res.push(item);
      }
    }
    return res;
  }
  switchsubsubMenuOpen() {
    this.subsubMenuOpen = !this.subsubMenuOpen;
  }
}
