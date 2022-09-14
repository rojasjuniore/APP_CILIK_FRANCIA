import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  constructor(
    private authSrv: AuthenticationService
  ){}

  transform(uid: unknown): Observable<any> {
    return this.authSrv.getByUID(uid);
  }

}
