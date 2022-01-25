import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../core/services/news.service';
import { ArticleInterface } from '../../core/interface';
import { IonInfiniteScroll } from '@ionic/angular';
import { MenuSegmentInterface } from '../../core/interface';
import { MenuService } from '../../core/services/menu.service';
import { InfiniteScrollComponent } from '../../core/components/infinite-scroll/infinite-scroll.component';
@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  @ViewChild('infinite', { static: false }) infiniteScroll: InfiniteScrollComponent;
  public title: string = 'Encabezados';
  public categories: MenuSegmentInterface[];
  public selectedCategory: string = 'business';
  public articles: ArticleInterface[] = [];
  public scroll: boolean;
  constructor(private _newsServices: NewsService, private _menuServices: MenuService) {
    this.getMenu();
  }

  ngOnInit() {
    this.getNewsCategory(this.selectedCategory);
  }

  public segmentChanged(event: Event) {
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.infiniteScroll.infiniteScroll.disabled = false;
    this.infiniteScroll.activeScroll = true;
    this.getNewsCategory(this.selectedCategory);
  }

  public loadData() {
    this._newsServices.getNewsByCategory(this.selectedCategory, true).subscribe(
      (articles) => {
        if (JSON.stringify(articles[articles.length - 1]) === JSON.stringify(this.articles[this.articles.length - 1])) {
          this.scroll = false;
        }
        this.articles = articles;
      });
  }

  private getNewsCategory(category: string) {
    this.scroll = true;
    this._newsServices.getNewsByCategory(category).subscribe((articles) => {
      this.articles = [...articles];
    });
  }

  private getMenu() {
    this._menuServices.getMenu().subscribe((categories) => {
      this.categories = categories;
      this.selectedCategory = this.categories[0].value;
      console.log(this.selectedCategory);

    });
  }
}
