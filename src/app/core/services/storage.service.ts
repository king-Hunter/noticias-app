import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ArticleInterface } from '../interface/index';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;
  private localArticles: ArticleInterface[] = [];

  constructor(private storageAngular: Storage) {
    this.init();
  }

  get getLocalArticles(): ArticleInterface[] {
    return this.localArticles;
  }

  async init() {
    const storage = await this.storageAngular.create();
    this.storage = storage;
    this.loadArticlesFavorite();
  }

  async saveOrRemoveArticle(article: ArticleInterface) {
    const isFavorite = this.localArticles.find(localArticle => localArticle.title === article.title);
    if (isFavorite) {
      this.localArticles = this.localArticles.filter(localArticle => localArticle.title !== article.title);
    } else {
      this.localArticles = [article, ...this.localArticles];
    }
    this.storage.set('articles', this.localArticles);
  }

  async loadArticlesFavorite() {
    try {
      const articles = await this.storage.get('articles');
      if (Array.isArray(articles)) {
        this.localArticles = articles;
      } else {
        this.localArticles = [];
      }
    } catch (error) {
      this.localArticles = [];
    }
  }

  articlesFavorite(article: ArticleInterface): boolean {
    return !!this.localArticles.find(localArticle => localArticle.title === article.title);
  }
}
