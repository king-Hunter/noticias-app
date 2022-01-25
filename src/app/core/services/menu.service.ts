import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuSegmentInterface } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _http: HttpClient) { }

  public getMenu() {
    return this._http.get<MenuSegmentInterface[]>('/assets/data/menu-options.json');
  }
}
