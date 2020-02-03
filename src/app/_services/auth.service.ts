import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { ConstValue } from '../_helpers/constValue';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    public get currentUserVal(): User {
        return this._currentUserSubject.value;
    }

    get currentUserToken() {
        return this.currentUserVal && this.currentUserVal.token;
    }

    constructor(private http: HttpClient) {
        this._currentUserSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
        this.currentUser = this._currentUserSubject.asObservable();
    }

    login(username, password) {
        return this.http.post<any>(`/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem(ConstValue.CurrentUser, JSON.stringify(user));
                this._currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem(ConstValue.CurrentUser);
        this._currentUserSubject.next(null);
    }

    private getUserFromLocalStorage(): User {
        try {
          return JSON.parse(localStorage.getItem(ConstValue.CurrentUser)!);
        } catch (error) {
          return null!;
        }
      }
}