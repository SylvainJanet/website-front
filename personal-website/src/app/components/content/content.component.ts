import { LanguageService } from './../../../services/languageService/language.service';
import { Component, Input, OnInit } from '@angular/core';
import { WebpageCategoryMain } from 'src/model/webpageCategoryMain';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  @Input() page: WebpageCategoryMain = new WebpageCategoryMain();
  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {}

  getTitle() {
    return this.page.title.strings.get(
      this.languageService.getCurrentLanguage()
    );
  }

  getContent() {
    return this.page.content.strings.get(
      this.languageService.getCurrentLanguage()
    );
  }
}
