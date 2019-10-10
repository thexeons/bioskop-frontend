import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';  

import { HttpModule } from '@angular/http';  

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CustomerService } from './customer.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,  
    HttpModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]

})
export class AppModule { }
