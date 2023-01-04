import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-question-popup',
  templateUrl: './question-popup.component.html',
  styleUrls: ['./question-popup.component.scss']
})
export class QuestionPopupComponent implements OnInit {

  questionPopupForm!: FormGroup;
  showAddButton = false;

  questionTypesList: Array<any> = [
    { label: 'Checkbox List V', value: 'checkbox' },
    { label: 'Paragraph answer', value: 'paragraph' },
  ];

  // questionPopupForm - controls
  get g() {
    return this.questionPopupForm.controls;
  }

  get answerOptions(){
    return this.questionPopupForm.controls['answerOption'] as FormArray
  }


  get checkBoxControls() {
    return (this.questionPopupForm.get('answerOption') as FormArray).controls;
  }

  checkboxValidation(index: number){
    return (this.answerOptions.controls[index] as FormGroup).controls;
  }

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<QuestionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.popUpForm();
  }

  // form declear
  private popUpForm(){
    this.questionPopupForm = this.fb.group({
      questionType: [''],
      question: [''],
      ownAnswer: [],
      questionRequried: [],
    })
  }

  //question type
  selectQue(event: any){
    this.questionPopupForm.removeControl('answerOption');
    if (event.target.value === 'checkbox') {
      this.showAddButton = true;
      this.g['ownAnswer'].enable();
      this.questionPopupForm.addControl('answerOption', this.fb.array([]));
      this.addQuestion();
    } else {
      this.questionPopupForm.patchValue({ ownAnswer: false });
      this.g['ownAnswer'].disable();
      this.showAddButton = false;
      this.questionPopupForm.addControl('answerOption', new FormControl(''));
    }
  }

  //form submit
  questionsSubmit(){
    this.dialogRef.close({data: this.questionPopupForm.getRawValue()});

  }

  //add questions
  addQuestion() {
    if(this.checkBoxControls.length < 5){
      const controls = this.fb.group({
        name: new FormControl('', Validators.required),
        isChecked: new FormControl()
      });
      
      (<FormArray>this.questionPopupForm.get('answerOption')).push(controls);

    }
  }

  //form Cancel
  onCancel(){
    this.dialogRef.close();
  }
}
