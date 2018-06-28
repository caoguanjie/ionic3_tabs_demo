import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TestObj } from './TestObj';
import { HttpService } from '../../providers/HttpService';
import { FileObj } from '../../model/FileObj';

@Injectable()
export class TestService {
  constructor(public http: Http, public httpService: HttpService) {
  }

  getJson() {
    return this.httpService.get('./assets/data/test.json').map((res: Response) => res.json());
  }

  getObj(): Observable<TestObj> {
    return this.httpService.get('./assets/data/test.json').map((res: Response) => res.json());
  }

  getList(): Observable<TestObj[]> {
    return this.httpService.get('./assets/data/testList.json').map((res: Response) => res.json());
  }

  getFileData(): Observable<FileObj[]> {
    return this.http.get('./assets/data/fileData.json').map((res: Response) => {
      const result = res.json();
      const fileObjList: FileObj[] = [];
      if (result.success) {
        for (const fileObj of result.data) {
          fileObjList.push({'thumbPath': fileObj.base64, 'origPath': fileObj.base64});
        }
      }
      return fileObjList;
    });
  }

}
