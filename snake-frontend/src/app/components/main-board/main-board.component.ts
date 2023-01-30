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
    this.getAllUsers();
    this.cast.subscribe((users) => {
      this.users = users;
    });
    if (localStorage.getItem("name")) {
      this.user.name = localStorage.getItem("name");
    }
    if (this.user.name) {
      this.userService.getUserByName(this.user.name).subscribe(() => {
        this.hideMain = true;
      }, () => {
        this.hideMain = false;
      })
    } else {
      this.hideMain = false;
    }
  }

  retrieveUsers(users: any[]): void {
    this.users$.next(users);
  }

  getAllUsers(): void {
    this.userService.getUsersByScore().subscribe((users: any) => {
      let newUsers = users.slice(0, 10);
      this.cast = newUsers;
      this.retrieveUsers(newUsers);
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

  updateScore(): void {
    let name: any = localStorage.getItem("name");
    this.userService.getUserByName(name).subscribe((user: any) => {
      this.user = user;
      this.user.score = localStorage.getItem("highscore");
      this.userService.updateUser(this.user).subscribe((user: any) => {
        this.user = user;
      });
      this.getAllUsers();
    })
  }

}
