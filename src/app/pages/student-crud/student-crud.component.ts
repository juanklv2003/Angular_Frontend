import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap
} from 'rxjs/operators';
import { Observable, Subject, merge } from 'rxjs';

@Component({
  selector: 'app-student-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-crud.component.html'
})
export class StudentCrudComponent {

  private refresh$ = new Subject<void>();

  private fb= inject(FormBuilder)
  private studentService= inject(StudentService)

  search = this.fb.control('');
  form = this.fb.nonNullable.group({
    id: 0,
    name: '',
    email: '',
    age: 0
  });

  students$: Observable<Student[]> = merge(
    this.search.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged()
    ),
    this.refresh$
  ).pipe(
    switchMap(() =>
      this.studentService.getAll(this.search.value ?? '')
    )
  );


  submit() {
    const { id, ...data } = this.form.getRawValue();

    const action$ = id
      ? this.studentService.update(id, data)
      : this.studentService.create(data);

    action$.subscribe(() => {
      this.form.reset({ id: 0, name: '', email: '', age: 0 });
      this.refresh$.next();
    });
  }

  edit(student: Student) {
    this.form.setValue({
      id: student.id,
      name: student.name,
      email: student.email,
      age: student.age
    });
  }

  remove(id: number) {
    if (!confirm('¿Eliminar estudiante?')) return;

    this.studentService.delete(id).subscribe(() => {
      this.refresh$.next();
    });
  }
}
