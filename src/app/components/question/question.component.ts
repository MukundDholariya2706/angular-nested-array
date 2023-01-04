import { QuestionPopupComponent } from './../question-popup/question-popup.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  questionListForm!: FormGroup;
  result: any;

  // get Form Controls
  get f() {
    return this.questionListForm.controls;
  }

  get questionListArray() {
    return this.questionListForm.controls['questionList'] as FormArray;
  }

  questionGroup(index: number){
    return (this.questionListArray.at(index) as FormGroup).controls;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    this.initForm();
  }

  // form declear
  private initForm() {
    this.questionListForm = this.fb.group({
      aboutYourSelf: ['', [Validators.required]],
      questionList: new FormArray([])
    });
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
        this.result = result.data;
        console.log('this.result :>> ', this.result);
        if(this.result.questionType == "paragraph") {
          this.queParagraph();
        }
        else{
          this.queCheckbox();
        }
      }
    });
  }

  // submit button
  onReviewAns() {
    console.log(this.questionListForm.value);
  }

  queParagraph(){
    let c = new FormGroup({
      question: new FormControl(this.result.question),
      answer: new FormControl('', this.result.questionRequried ? Validators.required : null)
    });

    (<FormArray>this.questionListForm.get('questionList')).push(c);
  }

  queCheckbox(){

  }
}
