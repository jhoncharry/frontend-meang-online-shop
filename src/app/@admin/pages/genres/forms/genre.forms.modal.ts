import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { getDirtyValues } from 'src/app/@core/helpers/form.functions';
import { GenreService } from 'src/app/@core/services/genre.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class GenreFormsModal {
  submitted = false;
  datePickerValidation: any = false;
  load: boolean = false;

  constructor(private fb: FormBuilder, private genreService: GenreService) {}

  registerForm() {
    return this.fb.group({
      name: ['Test', [Validators.required, Validators.minLength(3)]],
    });
  }

  updateForm() {
    return this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
        ],
      ],
    });
  }

  registerGenre(registerForm: any, modalElement: any) {
    this.submitted = true;

    if (registerForm.invalid) {
      return of({
        submitted: this.submitted,
        load: false,
      });
    }

    return this.genreService.addGenre(registerForm.value).pipe(
      map(({ data: { addGenre }, errors }) => {
        if (addGenre) {
          Swal.fire('Register', 'Successful genre register', 'success');
          this.submitted = false;

          modalElement.close();
          registerForm.reset();

          this.load = true;
        } else if (errors) {
          Swal.fire('Register', errors[0].message, 'error');
          this.load = false;
        }
        return of({
          submitted: this.submitted,
          load: this.load,
        });
      }),
      catchError(() => {
        this.load = false;
        Swal.fire('Error', 'Something went wrong... Networking!', 'error');
        return of({
          submitted: this.submitted,
          load: this.load,
        });
      })
    );
  }

  updateGenre(updateForm: any, modalElement: any, genreId: any) {
    this.submitted = true;

    if (updateForm.invalid) {
      return of({
        submitted: this.submitted,
        load: false,
      });
    }

    const valuesChanges = getDirtyValues(updateForm);

    if (!(Object.keys(valuesChanges).length === 0)) {
      return this.genreService.updateGenre(genreId, valuesChanges).pipe(
        map(({ data: { updateGenre }, errors }) => {
          if (updateGenre) {
            Swal.fire('Update', 'Successful update', 'success');
            this.submitted = false;

            modalElement.close();
            updateForm.reset();

            this.load = true;
          } else if (errors) {
            this.load = false;
            Swal.fire('Register', errors[0].message, 'error');
          }
          return of({
            submitted: this.submitted,
            load: this.load,
          });
        }),
        catchError(() => {
          this.load = false;
          Swal.fire('Error', 'Something went wrong... Networking!', 'error');
          return of({
            submitted: this.submitted,
            load: this.load,
          });
        })
      );
    } else {
      return of({
        submitted: false,
        load: false,
      });
    }
  }

  blockGenre(id: any) {
    return this.genreService.blockGenre(id).pipe(
      map(({ data: { blockGenre }, errors }) => {
        if (blockGenre) {
          Swal.fire('Genre Blocked', 'Successful block', 'success');
          this.load = true;
        } else if (errors) {
          this.load = false;
          Swal.fire('Genre Blocked', errors[0].message, 'error');
        }
        return of({
          load: this.load,
        });
      }),
      catchError(() => {
        this.load = false;
        Swal.fire('Error', 'Something went wrong... Networking!', 'error');
        return of({
          load: this.load,
        });
      })
    );
  }
}
