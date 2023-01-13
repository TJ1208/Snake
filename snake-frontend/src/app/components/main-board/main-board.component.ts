import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss']
})
export class MainBoardComponent implements OnInit {
  hideMain: boolean = true;
  user: any = {
    id: 0,
    name: '',
    score: 0
  }
  users: any[] = [];
  users$ = new BehaviorSubject<any[]>([]);
  cast = this.users$.asObservable();
  constructor(private userService: UserService) { }
  

  ngOnInit(): void {
    if (localStorage.getItem("name") == null) {
      this.hideMain = false;
    }
    this.getAllUsers();
    this.cast.subscribe((users) => {
      this.users = users;
    })
  }

  retrieveUsers(users: any[]): void {
    this.users$.next(users);
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((users: any) => {
      this.cast = users;
      this.retrieveUsers(users);
    })
  }

  addUser(): void {
    localStorage.setItem("name", this.user.name);
    let newUser: any = {
      id: this.user.id,
      name: this.user.name,
      score: this.user.score
    }
    this.userService.addUser(newUser).subscribe(() => {
      this.hideMain = true;
    }, (error) => {
      this.hideMain = false;
      console.log(error);
    });
  }

}
