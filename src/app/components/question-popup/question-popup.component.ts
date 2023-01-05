import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-question-popup',
  templateUrl: './question-popup.component.html',
  styleUrls: ['./question-popup.component.scss'],
})
export class QuestionPopupComponent implements OnInit {
  questionPopupForm!: FormGroup;
  showAddButton: boolean = false;
  formSubmitted: boolean = false;

  questionTypesList: Array<{label: string, value: string}> = [
    { label: 'Checkbox List V', value: 'checkbox' },
    { label: 'Paragraph answer', value: 'paragraph' },
  ];

  // questionPopupForm - controls
  get g(): { [key: string]: AbstractControl } {
    return this.questionPopupForm.controls;
  }

  get answerOptions(): FormArray {
    return this.questionPopupForm.controls['answerOption'] as FormArray;
  }

  get checkBoxControls(): AbstractControl[] {
    return (this.questionPopupForm.get('answerOption') as FormArray).controls;
  }

  checkboxValidation(index: number): { [key: string]: AbstractControl } {
    return (this.answerOptions.controls[index] as FormGroup).controls;
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<QuestionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.popUpForm();
  }

  // form declear
  private popUpForm(): void {
    this.questionPopupForm = this.fb.group({
      questionType: ['', Validators.required],
      question: ['', Validators.required],
      ownAnswer: [],
      questionRequried: [],
    });
  }

  //question type
  selectQue(event: any): void {
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
  questionsSubmit(): void {
    this.formSubmitted = true;
    if (this.questionPopupForm.invalid) return;
    this.dialogRef.close({ data: this.questionPopupForm.getRawValue() });
  }

  //add questions
  addQuestion(): void {
    if (this.checkBoxControls.length < 5) {
      this.formSubmitted = false;
      const controls = this.fb.group({
        name: new FormControl('', Validators.required),
        isChecked: new FormControl(),
      });

      (<FormArray>this.questionPopupForm.get('answerOption')).push(controls);
    }
  }

  //form Cancel
  onCancel(): void {
    this.dialogRef.close();
  }
}
