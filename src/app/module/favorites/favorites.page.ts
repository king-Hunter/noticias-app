import { StorageService } from './../../core/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ArticleInterface } from '../../core/interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  public title = 'Favoritos';
  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

  get articlesFavorites(): ArticleInterface[] {
    return this.storageService.getLocalArticles;
  }
}
