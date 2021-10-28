import { Component, OnInit } from '@angular/core';
import { WebpageCategoryMain } from 'src/model/webpageCategoryMain';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  page: WebpageCategoryMain = new WebpageCategoryMain();
  constructor() {}

  ngOnInit(): void {}

  test(event: WebpageCategoryMain) {
    this.page = event;
  }
}
