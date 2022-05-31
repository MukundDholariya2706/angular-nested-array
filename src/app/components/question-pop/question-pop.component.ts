import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-question-pop',
  templateUrl: './question-pop.component.html',
  styleUrls: ['./question-pop.component.scss'],
})
export class QuestionPopComponent implements OnInit {
  questionPopupForm!: FormGroup;
  showAddButton = false;

  questionTypesList: Array<any> = [
    { label: 'Checkbox List V', value: 'checkbox' },
    { label: 'Paragraph answer', value: 'paragraph' },
  ];

  get g() {
    return this.questionPopupForm.controls;
  }

  
  get checkBoxControls() {
    return (this.questionPopupForm.get('answerOption') as FormArray).controls;
  }
  
  checkboxValidation(index: number){

    return (this.answerOptions.controls[index] as FormGroup).controls;
  }

  get answerOptions(){
    return this.questionPopupForm.controls['answerOption'] as FormArray
  }

  controlsOfAnswerOption(){
    return (this.answerOptions.controls[0] as FormGroup).controls;
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<QuestionPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.popUpForm();
  }

  // Form

  private popUpForm() {
    this.questionPopupForm = this.fb.group({
      queType: [''],
      question: ['',Validators.required],
      ownAnswer: [],
      queRequired: [],
    });
  }

  // form submit

  queSubmit() {
    // console.log('this.answerOptions :>> ', this.checkboxValidation(0)['name']);
    console.log(this.questionPopupForm.controls);
    console.log('data',this.questionPopupForm.value)
    debugger

    if(this.g['queRequired'].value === true)
    {
      for(let i = 0 ; i < this.answerOptions.length; i++){
        this.checkboxValidation(i)['isRequried'].patchValue('true')
        // this.checkboxValidation(i)['name'].addValidators(Validators.required);
        // this.checkboxValidation(i)['name'].updateValueAndValidity();
      }
    }

  }

  // function

  selectQue(event: any) {
    this.questionPopupForm.removeControl('answerOption');
    if (event.target.value === 'checkbox') {
      this.showAddButton = true;
      this.g['ownAnswer'].enable();
      this.questionPopupForm.addControl('answerOption', this.fb.array([]));

    } else {
      this.questionPopupForm.patchValue({ ownAnswer: false });
      this.g['ownAnswer'].disable();
      this.showAddButton = false;
      this.questionPopupForm.addControl('answerOption', new FormControl(''));
    }
  }

  //add qution
  addQuestion() {
    if (this.checkBoxControls.length < 5) {
      const controls = this.fb.group({
        name: new FormControl('', Validators.required),
        isRequried: new FormControl('false')
      });
      
      (<FormArray>this.questionPopupForm.get('answerOption')).push(controls);
      
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
