import { HeaderContentComponent } from './../components/header-content/header-content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from '../components/article/article.component';
import { ArticlesComponent } from '../components/articles/articles.component';
import { InfiniteScrollComponent } from '../components/infinite-scroll/infinite-scroll.component';

@NgModule({
  declarations: [HeaderComponent, ArticleComponent, ArticlesComponent, HeaderContentComponent, InfiniteScrollComponent],
  imports: [CommonModule, IonicModule],
  exports: [HeaderComponent, ArticlesComponent, HeaderContentComponent, InfiniteScrollComponent]
})
export class ComponentsModule {}
