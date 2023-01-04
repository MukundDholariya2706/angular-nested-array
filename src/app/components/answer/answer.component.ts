import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

export class Data {
  constructor (
    public aboutYourSelf: string = '',
    public questionList: QuestionList[] = []
  ) {}
}

export interface Data {
  aboutYourSelf: string,
  questionList: QuestionList[]
}

export interface QuestionList {
  question: string,
  answer: string[] | string,
  ownAnswer?: string
}

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  data: Data = new Data();

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
    let a: any = this.location.getState();
    if(!!a.answer) this.data = a?.answer;
  }

  typeOf(value: any) {
    return typeof value;
  }
  

}
