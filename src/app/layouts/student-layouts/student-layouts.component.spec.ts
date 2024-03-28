import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLayoutsComponent } from './student-layouts.component';

describe('StudentLayoutsComponent', () => {
  let component: StudentLayoutsComponent;
  let fixture: ComponentFixture<StudentLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentLayoutsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
