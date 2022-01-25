import { HttpHeaders } from '@angular/common/http';
import { apiKey } from '../config/api';
import { OptionsApiNewsInterface } from '../interface/index';
export class OptionsApiNewsModel implements OptionsApiNewsInterface {
  public headers: HttpHeaders;
  public params: {
    [param: string]:
      | string
      | number
      | boolean
      | readonly (string | number | boolean)[];
  };
  constructor(category?: string, page?: number, country: string = 'us') {
    this.headers = new HttpHeaders({ 'X-Api-Key': apiKey });
    this.params = { country, category, page };
  }
}
