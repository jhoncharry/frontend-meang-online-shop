import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { getDirtyValues } from 'src/app/@core/helpers/form.functions';
import { UserService } from 'src/app/@core/services/user.service';
import { Roles } from 'src/app/@core/types/roles.types';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UserFormsModal {
  submitted = false;
  datePickerValidation: any = false;
  load: boolean = false;

  private _roles: any[] = ['CLIENT', 'ADMIN'];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  public get roles(): any[] {
    return this._roles;
  }

  registerForm() {
    return this.fb.group({
      name: ['Test', [Validators.required, Validators.minLength(3)]],
      lastname: ['Serrato', [Validators.required, Validators.minLength(3)]],
      email: [
        'test1@gmail.com',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['123456', [Validators.required, Validators.minLength(3)]],
      birthday: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      role: ['', [Validators.required, this.validateRole]],
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
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      birthday: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      role: ['', [Validators.required, this.validateRole]],
    });
  }

  registerUser(registerForm: any, modalElement: any) {
    this.submitted = true;

    registerForm.controls.birthday.errors
      ? (this.datePickerValidation = true)
      : (this.datePickerValidation = false);

    if (registerForm.invalid) {
      return of({
        submitted: this.submitted,
        datePickerValidation: this.datePickerValidation,
        load: false,
      });
    }

    return this.userService.register(registerForm.value).pipe(
      map(({ data: { register }, errors }) => {
        if (register) {
          Swal.fire('Register', 'Successful register', 'success');
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
          datePickerValidation: this.datePickerValidation,
          load: this.load,
        });
      }),
      catchError(() => {
        this.load = false;
        Swal.fire('Error', 'Something went wrong... Networking!', 'error');
        return of({
          submitted: this.submitted,
          datePickerValidation: this.datePickerValidation,
          load: this.load,
        });
      })
    );
  }

  updateUser(
    updateForm: any,
    modalElement: any,
    userId: any,
    defaultDate: any
  ) {
    this.submitted = true;

    if (updateForm.invalid) {
      return of({
        submitted: this.submitted,
        load: false,
      });
    }

    const valuesChanges = getDirtyValues(updateForm);

    if (defaultDate !== updateForm.get('birthday')?.value) {
      valuesChanges['birthday'] = updateForm.get('birthday')?.value;
    }

    if (!(Object.keys(valuesChanges).length === 0)) {
      return this.userService.update({ _id: userId, ...valuesChanges }).pipe(
        map(({ data: { updateUser }, errors }) => {
          if (updateUser) {
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

  deleteUser(_id: any) {
    return this.userService.delete(_id).pipe(
      map(({ data: { deleteUser }, errors }) => {
        if (deleteUser) {
          Swal.fire('User Deleted', 'Successful delete', 'success');
          this.load = true;
        } else if (errors) {
          this.load = false;
          Swal.fire('Genre Deleted', errors[0].message, 'error');
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

  unblockUser(_id: any, unblock: boolean) {
    return this.userService.unblock(_id, unblock).pipe(
      map(({ data: { unblockUser }, errors }) => {
        if (unblockUser) {
          if (unblock) {
            Swal.fire(
              'User Unblocked',
              'user successfully unblocked',
              'success'
            );
          } else {
            Swal.fire('User Blocked', 'user successfully blocked', 'success');
          }
          this.load = true;
        } else if (errors) {
          this.load = false;
          Swal.fire('User Blocked/Unblocked', errors[0].message, 'error');
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

  validateRole(control: AbstractControl) {
    if (!Object.values(Roles).includes(control.value as Roles)) {
      return { invalidRole: true };
    }
    return null;
  }
}
