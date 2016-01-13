import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Injectable} from 'angular2/core';

interface Hero {
  id: number;
  name: string;
}

const DATA:Hero[] = [
  {id: 0, name: 'John'},
  {id: 1, name: 'Mike'},
  {id: 2, name: 'Joe'},  
];

@Injectable()
export class MyService {
  getData() {
    return Promise.resolve(DATA);
  }
  // See the "Take it slow" appendix
  getDataAsync() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(DATA), 2000) // 2 seconds
    );
  }
}



@Component({
  selector: 'my-comp',
  template:`
    <h1>My Comp</h1>
    `
})
export class MyComponent {}

@Component({
  selector: 'my-comp2',
  template:`
    <h1>My Comp2</h1>
    `
})
export class MyComponent2 {}

@RouteConfig([
  {path: '/', name: 'MyComponent', component: MyComponent, useAsDefault: true},
  {path: '/my-comp2', name: 'MyComponent2', component: MyComponent2}
])
@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
      <label>name: </label>
      <div><input [(ngModel)]="hero.name" placeholder="name"></div>
    </div>

    <ul *ngIf="data" class="heroes">
      <li *ngFor="#hero of data">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>

    <h3 *ngIf="!data">Loading ...</h3>

    <nav>
    <a [routerLink]="['MyComponent']">MyComponent</a>
      <a [routerLink]="['MyComponent2']">MyComponent2</a>
    </nav>
    <router-outlet></router-outlet>
    `,
  directives: [ROUTER_DIRECTIVES],
  providers: [MyService]
})
export class AppComponent implements OnInit {

  constructor(private _myService: MyService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._myService.getDataAsync().then(data => this.data = data);
  }

  public title = 'Tour of Heroes';
  public hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  log(s:string) {
    console.log(s);
  }
}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
