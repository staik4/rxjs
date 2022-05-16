import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {Observable, BehaviorSubject, map} from 'rxjs';

interface User {
  id: Number;
  name: String;
  gender: String;
  age?: Number;
  email: String;
  status: String | Number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular';
  @Input() usersData: User[] | undefined;

  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  filteredUsers: Observable<User[]> = new Observable<User[]>();

  ngOnInit() {
    this.filteredUsers = this.users.pipe(map((users) => {
      console.log(this._filterUser(users));
      return this._filterUser(users);
    }));

    this.users.subscribe(() => {});
  }

  ngOnDestroy() {}

  fetchData() {
    fetch('https://gorest.co.in/public/v2/users').then((response) => {
      response.json().then((res) => {
        // console.log(res);
        this.users.next(res);
        return res;
      });
    });
  }

  private _filterUser = (users: User[]): User[] => {
    return users.filter(user => user.gender === 'female');
  }

  handleClickButton = (): void => {
    this.fetchData();
  };

  updateUsers = () => {
    const newUsers: User[] = [
      {
        email: 'aasa_pandey_miss@ankunding-casper.name',
        gender: 'female',
        id: 4014,
        name: 'Miss Aasa Pandey',
        status: 'inactive',
      },
      {
        email: 'aasa_pandey_miss@ankunding-casper.name',
        gender: 'female',
        id: 4014,
        name: 'Miss Aasa Pandey',
        status: 'inactive',
      },
      {
        email: 'aasa_pandey_miss@ankunding-casper.name',
        gender: 'female',
        id: 4014,
        name: 'Miss Aasa Pandey',
        status: 'inactive',
      },
      {
        email: 'aasa_pandey_miss@ankunding-casper.name',
        gender: 'female',
        id: 4014,
        name: 'Miss Aasa Pandey',
        status: 'inactive',
      },
      {
        email: 'aasa_pandey_miss@ankunding-casper.name',
        gender: 'female',
        id: 4014,
        name: 'Miss Aasa Pandey',
        status: 'inactive',
      },
    ];

    this.users.next(newUsers);
  };
}
