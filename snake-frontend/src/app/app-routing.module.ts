import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainBoardComponent } from './components/main-board/main-board.component';

const routes: Routes = [
  { path: 'snake', component: MainBoardComponent },
  { path: '**', component: MainBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
