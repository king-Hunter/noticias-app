import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrl } from '../config/api';
import { OptionsApiNewsInterface } from '../interface';
import { OptionsApiNewsModel } from '../models';
import {
  ArticleInterface,
  NewsResponseInterface,
  ArticlesByCategoryInterface,
} from '../interface';
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private _url: string = `${apiUrl}`;
  private _options: OptionsApiNewsInterface = new OptionsApiNewsModel();
  private _articlesByCategory: ArticlesByCategoryInterface = {};

  constructor(private _http: HttpClient) { }

  public getNewsByCategory(category: string, loadMore: boolean = false): Observable<ArticleInterface[]> {
    if (loadMore) {
      return this.getArticlesByCategory(category);
    }

    if (this._articlesByCategory[category]) {
      return of(this._articlesByCategory[category].articles);
    }

    return this.getArticlesByCategory(category);
  }

  private getArticlesByCategory(category: string): Observable<ArticleInterface[]> {
    if (!Object.keys(this._articlesByCategory).includes(category)) {
      this._articlesByCategory[category] = {
        page: 0,
        articles: [],
      };
    }

    const page = this._articlesByCategory[category].page + 1;

    this._options.params.category = category;
    this._options.params.page = page;

    return this.queryNewsResponse().pipe(
      map(({ articles }) => {
        if (articles.length === 0) return this._articlesByCategory[category].articles;
        this._articlesByCategory[category] = {
          page: page,
          articles: [
            ...this._articlesByCategory[category].articles,
            ...articles,
          ],
        };
        return this._articlesByCategory[category].articles;
      })
    );
  }

  private queryNewsResponse(): Observable<NewsResponseInterface> {
    return this._http.get<NewsResponseInterface>(this._url, this._options);
  }
}
