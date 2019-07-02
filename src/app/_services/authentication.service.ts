import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private _currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    public get currentUserVal(): User {
        return this._currentUserSubject.value;
    }

    get currentUserToken() {
        return this.currentUserVal.token;
    }

    constructor(private http: HttpClient) {
        this._currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this._currentUserSubject.asObservable();
    }

    login(username, password) {
        return this.http.post<any>(`/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this._currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this._currentUserSubject.next(null);
    }
}