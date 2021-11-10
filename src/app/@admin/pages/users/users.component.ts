import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DocumentNode } from 'graphql';

import { UserFormsModal } from './forms/user.forms.modal';
import { getUsers } from 'src/app/@graphql/operators/query/user.query';

import { alertWithTwoOptions } from '../../shared/alerts/alerts';
import { mergeMap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { formatNumbers, legalDate } from 'src/app/@core/helpers/form.functions';
import { ActiveValues } from 'src/app/@core/types/user-active';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  // ******** VARIABLES TO PAGINATION **************************************
  query: DocumentNode;
  context: object;

  include: boolean;
  itemsPage: number;

  dataList: any;
  columns: Array<any>;

  load: boolean = false;
  filterActiveValues: ActiveValues = ActiveValues.ACTIVE;

  // ******** DATE AND FORM SUBMITTED *************************************
  datePickerValidation: any = false;
  submitted = false;

  defaultDate: any;

  // ******** LOAD USER INFORMATION WHEN WE CHOOSE SOME MODAL ************
  userInformation: any;
  private userId: string;

  // ******** MODALS ****************************************************
  action: string;
  modalElement: NgbModalRef;

  @ViewChild('content', { read: TemplateRef }) content: TemplateRef<any>;
  @ViewChild('contentUpdate', { read: TemplateRef })
  contentUpdate: TemplateRef<any>;
  @ViewChild('contentInformation', { read: TemplateRef })
  contentInformation: TemplateRef<any>;

  // ******** FORMS *******************************************************
  public registerForm: FormGroup;
  public updateForm: FormGroup;

  roles: any;

  constructor(
    private modalService: NgbModal,
    private userFormsModal: UserFormsModal
  ) {
    this.registerForm = this.userFormsModal.registerForm();
    this.updateForm = this.userFormsModal.updateForm();

    // ******** INITIALIZATION VARIABLES THAT GOING TO PAGINATION *******
    this.initializateUserComponentChild();
  }

  ngOnInit(): void {}

  // **************************************************** VALUES FROM CHILD ************************************************
  async takeAction($event: any) {
    this.action = $event[0];
    const user = $event[1];

    if (user) this.userInformation = user;

    switch (this.action) {
      case 'add':
        this.openRegister(this.content);
        break;
      case 'edit':
        this.openUpdate(this.contentUpdate);
        break;
      case 'info':
        this.openInformation(this.contentInformation);
        break;
      case 'block':
        this.blockForm();
        break;
      case 'unblock':
        this.unblockForm();
        break;
      default:
        this.action = '';
        break;
    }
  }

  takeLoad($event: any) {
    this.load = $event;
  }

  dataAsign($event: any) {
    const date = `${$event.year}-${formatNumbers($event.month)}-${formatNumbers(
      $event.day
    )}`;

    if (this.action === 'add') this.getControlRegister.birthday.setValue(date);
    if (this.action === 'edit') this.getControlUpdate.birthday.setValue(date);

    this.datePickerValidation = false;
  }

  // **************** VALUES FROM SELECT ***************

  changeRole($event: any) {
    if (this.action === 'add')
      this.getControlRegister.role.setValue($event.target.value);
    if (this.action === 'edit')
      this.getControlUpdate.role.setValue($event.target.value);
  }

  // **************************************************** REGISTER ************************************************
  async openRegister(content: any) {
    this.getControlRegister.birthday.setValue(legalDate());
    this.getControlRegister.role.setValue('');

    this.roles = this.userFormsModal.roles;

    await this.openModal(content);
    this.closeAction();
  }

  get getControlRegister() {
    return this.registerForm.controls;
  }

  register() {
    this.userFormsModal
      .registerUser(this.registerForm, this.modalElement)
      .pipe(
        mergeMap((results: any) => {
          if (results instanceof Observable) return results;
          return of(results);
        })
      )
      .subscribe((result: any) => {
        const { submitted, datePickerValidation, load } = result;
        this.submitted = submitted;
        this.datePickerValidation = datePickerValidation;
        this.load = load;
      });
  }

  // **************************************************** UPDATE ************************************************
  async openUpdate(content: any) {
    this.userId = this.userInformation._id || 'no_id';
    this.defaultDate = this.userInformation.birthday;

    this.roles = this.userFormsModal.roles;

    this.updateForm.setValue({
      name: this.userInformation.name || '',
      lastname: this.userInformation.lastname || '',
      birthday: this.userInformation.birthday || '',
      role: this.userInformation.role || '',
    });

    await this.openModal(content);
    this.closeAction();
  }

  get getControlUpdate() {
    return this.updateForm.controls;
  }

  update() {
    this.userFormsModal
      .updateUser(
        this.updateForm,
        this.modalElement,
        this.userId,
        this.defaultDate
      )
      .pipe(
        mergeMap((results: any) => {
          if (results instanceof Observable) return results;
          return of(results);
        })
      )
      .subscribe((result: any) => {
        const { submitted, load } = result;
        this.submitted = submitted;
        this.load = load;
      });
  }

  // **************************************************** INFORMATION ************************************************
  async openInformation(content: any) {
    await this.openModal(content);

    this.closeAction();
  }

  editTransition() {
    this.modalElement.close();

    this.action = 'edit';
    this.openUpdate(this.contentUpdate);
  }

  unblockTransition() {
    this.modalElement.close();

    if (this.userInformation.active !== false) {
      this.action = 'block';
      this.blockForm();
    } else {
      this.action = 'unblock';
      this.unblockForm();
    }
  }

  // **************************************************** UNBLOCK ************************************************

  async blockForm() {
    const result = await alertWithTwoOptions(
      'Block User',
      'Do you want to block this user?',
      'No.',
      '<i class="fas fa-lock"></i>&nbsp;Yes.'
    );
    if (result === false) this.unblock(this.userInformation._id, false);
  }

  async unblockForm() {
    const result = await alertWithTwoOptions(
      'Unblock user',
      'Do you want to unblock this user?',
      'No.',
      '<i class="fas fa-lock-open"></i>&nbsp;Yes.'
    );
    if (result === false) this.unblock(this.userInformation._id, true);
  }

  unblock(id: any, unblock: boolean) {
    this.userFormsModal
      .unblockUser(id, unblock)
      .pipe(mergeMap((results: any) => results))
      .subscribe((result: any) => {
        const { load } = result;
        this.load = load;
      });
  }

  // **************************************************** OTHER FUNCTIONS ************************************************

  async openModal(content: any) {
    this.modalElement = await this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  closeAction() {
    this.modalElement.dismissed.subscribe(() => {
      this.submitted = false;
    });
  }

  initializateUserComponentChild() {
    this.query = getUsers;
    // this.context = {};

    this.include = true;
    // this.itemsPage = 5;

    this.dataList = {
      definitionKey: 'users',
      listKey: 'users',
    };

    this.columns = [
      {
        label: '#',
        property: '_id',
      },
      {
        label: 'Name',
        property: 'name',
      },
      {
        label: 'Lastname',
        property: 'lastname',
      },
      {
        label: 'Email',
        property: 'email',
      },
      {
        label: 'Roles',
        property: 'role',
      },
      {
        label: 'Active?',
        property: 'active',
      },
    ];
  }
}
