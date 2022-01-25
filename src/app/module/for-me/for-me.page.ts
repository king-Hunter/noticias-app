import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../core/services/news.service';
import { ArticleInterface } from '../../core/interface';
import { InfiniteScrollComponent } from '../../core/components/infinite-scroll/infinite-scroll.component';

@Component({
  selector: 'app-for-me',
  templateUrl: './for-me.page.html',
  styleUrls: ['./for-me.page.scss'],
})
export class ForMePage implements OnInit {
  @ViewChild('infinite', { static: false }) infiniteScroll: InfiniteScrollComponent;
  public title: string = 'Para Mi';
  public articles: ArticleInterface[] = [];
  public scroll: boolean = true;
  constructor(private _newsService: NewsService) { }

  ngOnInit() {
    this.getTopHeadlines();
  }

  public loadData() {
    this._newsService.getNewsByCategory('business', true).subscribe(
      (articles) => {
        if (JSON.stringify(articles[articles.length - 1]) === JSON.stringify(this.articles[this.articles.length - 1])) {
          this.scroll = false;
        }
        this.articles = articles;
      });
  }


  private getTopHeadlines() {
    this._newsService.getNewsByCategory('business').subscribe((articles) => {
      this.articles = [...articles];
    });
  }
}
