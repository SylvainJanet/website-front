import { Component, OnInit } from '@angular/core';
import { Page } from 'src/model/page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  page: Page = new Page();
  constructor() {}

  ngOnInit(): void {}

  test(event: Page) {
    this.page = event;
  }
}
