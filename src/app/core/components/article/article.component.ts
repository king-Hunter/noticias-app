import { Component, Input } from '@angular/core';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { ArticleInterface } from '../../interface';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() public article: ArticleInterface;
  @Input() public index: number;
  constructor(
    private platform: Platform, private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService
  ) { }

  openArticle() {
    if (this.platform.is('capacitor')) {
      const browser = this.iab.create(this.article.url, '_system');
      browser.show();
      return;
    }
    window.open(this.article.url, '_blank');
  }

  shareArticle() {
    const { title, url, source } = this.article;
    if (this.platform.is('capacitor')) {
      this.socialSharing.share(title, source.name, null, url);
    }
  }

  async openActionSeet() {
    const articleInFavorite = this.storageService.articlesFavorite(this.article);
    const btnShare: ActionSheetButton = {
      text: 'Compartir',
      cssClass: 'action-sheet-button-share',
      icon: 'share-social-outline',
      handler: () => {
        this.shareArticle();
      }
    };

    const buttons: ActionSheetButton[] = [{
      text: articleInFavorite ? 'Remover favorito' : 'Favorito',
      icon: articleInFavorite ? 'heart' : 'heart-outline',
      handler: () => {
        this.onToggleFavorite();
      }
    }, {
      text: 'Cancel',
      icon: 'close-outline',
      role: 'cancel',
      cssClass: 'action-sheet-button-cancel'
    }];
    if (this.platform.is('capacitor')) {
      buttons.unshift(btnShare);
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons
    });
    await actionSheet.present();
  }

  onToggleFavorite() {
    this.storageService.saveOrRemoveArticle(this.article);
  }
}
