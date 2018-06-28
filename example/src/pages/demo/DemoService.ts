import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class DemoService {
  constructor(public http: Http) {
  }


  geCityData() {
    return this.http.get('./assets/data/cityData.json').map((res: Response) => res.json());
  }

}
