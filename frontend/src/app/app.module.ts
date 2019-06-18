import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { MenuComponent } from './components/menu.component';
import { SearchComponent } from './components/search.component';
import { ResultsComponent } from './components/results.component';
import { CardComponent } from './components/card.component';
import { SelectComponent } from './components/select.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    SearchComponent,
    ResultsComponent,
    CardComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'user', loadChildren: () => import('./modules/users.module').then(m => m.UsersModule)},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
