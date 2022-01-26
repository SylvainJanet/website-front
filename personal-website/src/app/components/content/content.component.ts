import { LanguageService } from './../../../services/languageService/language.service';
import { Component, Input, OnInit } from '@angular/core';
import { Page } from 'src/model/page';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  @Input() page: Page = new Page();
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
