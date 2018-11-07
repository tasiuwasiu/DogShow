import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/User.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  register(newUser: User) {
    return this.httpClient.post<any>(`${environment.apiUrl}user/register`, newUser);
  }

  editUser(userID: number, newData: User) {
    return this.httpClient.post<any>(`${environment.apiUrl}user/edit/${userID}`, newData);
  }

}
