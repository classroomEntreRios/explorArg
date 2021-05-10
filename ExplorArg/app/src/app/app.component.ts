import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  ngOnInit() {
    this.setTitle();
  }

  title = 'app';


  constructor(private Title: Title) {}

  setTitle(){
    this.Title.setTitle('ExplorArg™');
  }

}
