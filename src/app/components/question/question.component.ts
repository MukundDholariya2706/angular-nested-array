import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  
  questionListForm!: FormGroup;

  // get Form Controls
  get f(){
    return this.questionListForm.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  // form declear
  private initForm(){
    this.questionListForm = this.fb.group({
      
    })
  }

 //open Question pop-up

  openDialog(){

  }

  // submit button
  onReviewAns(){
    console.log(this.questionListForm.value);
  }

}
