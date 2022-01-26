import { MenuItemService } from '../../../services/menuItemService/menu-item-service.service';
import { SupportedLanguage } from '../../../constants/languages/supportedLanguage';
import { MenuItem } from '../../../model/menuItem';
import { LanguageService } from './../../../services/languageService/language.service';
import { LogService } from './../../../services/log/log.service';
import { MenuDto } from '../../../interfaces/menuDto';
import { MenuService } from '../../../services/websiteMainMenuService/menu.service';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { Menu } from 'src/model/menu';
import { Page } from 'src/model/page';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menu: Menu = new Menu();
  log: LogService;
  otherLanguages: SupportedLanguage[];
  @Output() changeMenuItem = new EventEmitter<Page>();
  allItems: MenuItem[] = [];
  subsubMenuOpen: Boolean = false;
  page: Page = new Page();

  constructor(
    private menuService: MenuService,
    private logService: LogService,
    private languageService: LanguageService,
    private menuItemService: MenuItemService
  ) {
    this.log = logService.withClassName(HeaderComponent.name);
    this.otherLanguages = [];
    this.updateDisplay();
    menuService.getAll().subscribe((m) => {
      if (m.entities) {
        this.log.debug('entities', m);
        this.menu = Menu.convertToEntity(m.entities[0]);
      }
    });
    menuItemService.getAll().subscribe((m) => {
      if (m.entities) {
        this.log.debug('entities', m);
        this.allItems = MenuItem.convertListToEntity(m.entities);
      }
    });
  }

  enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
  }

  updateDisplay() {
    this.otherLanguages = [];
    for (const value of this.enumKeys(SupportedLanguage)) {
      if (this.currentLanguage() != SupportedLanguage[value]) {
        this.otherLanguages.push((<any>SupportedLanguage)[value]);
      }
    }
  }

  ngOnInit(): void {}

  currentLanguage(): SupportedLanguage {
    return this.languageService.getCurrentLanguage();
  }

  getTitle(item: MenuItem) {
    return item.title.strings.get(this.currentLanguage());
  }

  changeLanguage(language: SupportedLanguage) {
    this.languageService.setCurrentLanguage(language);
    this.updateDisplay();
  }

  categoryClick(item: MenuItem) {
    for (let it of this.allItems) {
      if (it && it.id && it.id == item.id) {
        item = it;
      }
    }
    console.log(item.page);
    this.page = item.page;
    this.changeMenuItem.emit(item.page);
  }

  getActualMainMenuItem(el: MenuItem): MenuItem {
    for (let item of this.allItems) {
      if (item.id && item.id == el.id) {
        return item;
      }
    }
    return new MenuItem();
  }

  getTitleById(el: MenuItem): string | undefined | null {
    for (let item of this.allItems) {
      if (item.id && item.id == el.id) {
        return item.title.strings.get(this.currentLanguage());
      }
    }
    return null;
  }

  subItems(el: MenuItem) {
    let res = [];
    let properEl = new MenuItem();
    for (let item of this.allItems) {
      if (item.id && item.id == el.id) {
        properEl = item;
      }
    }
    for (let item of this.allItems) {
      if (
        item.id &&
        properEl.subItems.map((wmmi) => wmmi.id).includes(item.id)
      ) {
        res.push(item);
      }
    }
    return res;
  }
  switchsubsubMenuOpen() {
    this.subsubMenuOpen = !this.subsubMenuOpen;
  }

  inMenu: Map<MenuItem, boolean> = new Map<MenuItem, boolean>();
  inMenuItems: Map<MenuItem, boolean> = new Map<MenuItem, boolean>();
  inLanguageMenu: boolean = false;
  inLanguageMenuItems: boolean = false;

  enterLanguageMenu() {
    this.inLanguageMenu = true;
  }

  exitLanguageMenu() {
    this.inLanguageMenu = false;
  }

  enterLanguageItems() {
    this.inLanguageMenuItems = true;
  }

  exitLanguageItems() {
    this.inLanguageMenuItems = false;
  }

  isLanguageShown() {
    return this.inLanguageMenu || this.inLanguageMenuItems;
  }

  enterMenu(item: MenuItem) {
    this.inMenu.set(item, true);
  }

  exitMenu(item: MenuItem) {
    this.inMenu.set(item, false);
  }

  enterItems(item: MenuItem) {
    this.inMenuItems.set(item, true);
  }

  exitItems(item: MenuItem) {
    this.inMenuItems.set(item, false);
  }

  isShown(item: MenuItem) {
    if (!this.inMenu.has(item)) {
      return false;
    }
    if (!this.inMenuItems.has(item)) {
      return this.inMenu.get(item);
    }
    return this.inMenu.get(item) || this.inMenuItems.get(item);
  }

  getContent() {
    return this.page.content.strings.get(
      this.languageService.getCurrentLanguage()
    );
  }
}
