import { QuestionPopupComponent } from './../question-popup/question-popup.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  questionListForm!: FormGroup;

  // get Form Controls
  get f() {
    return this.questionListForm.controls;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    this.initForm();
  }

  // form declear
  private initForm() {
    this.questionListForm = this.fb.group({});
  }

  //open Question pop-up
  openDialog() {
    const dialogRef = this.dialog.open(QuestionPopupComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        //result is empty
      }

      if (result) {
        console.log('result :>> ', result);
      }
    });
  }

  // submit button
  onReviewAns() {
    console.log(this.questionListForm.value);
  }
}
