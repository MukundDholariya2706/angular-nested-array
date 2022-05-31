import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPopComponent } from './question-pop.component';

describe('QuestionPopComponent', () => {
  let component: QuestionPopComponent;
  let fixture: ComponentFixture<QuestionPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionPopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
