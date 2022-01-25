import { Component, Input } from '@angular/core';
import { ArticleInterface } from '../../interface/index';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {
@Input() public articles: ArticleInterface[];
  constructor() { }

}
