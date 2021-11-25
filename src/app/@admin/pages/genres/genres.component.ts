import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DocumentNode } from 'graphql';

import { GenreFormsModal } from './forms/genre.forms.modal';
import { getGenres } from 'src/app/@graphql/operators/query/genre.query';

import { alertWithTwoOptions } from '../../shared/alerts/alerts';
import { mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ActiveValues } from 'src/app/@core/types/user-active';
import { TitleService } from '../../core/services/title.service';
import { LABEL } from '../../core/services/constants/title.constants';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  // ******** VARIABLES TO PAGINATION **************************************
  query: DocumentNode;
  context: object;

  include: boolean;
  itemsPage: number;

  dataList: any;
  columns: Array<any>;

  load: boolean = false;
  filterActiveValues: ActiveValues = ActiveValues.ACTIVE;

  // ******** FORM SUBMITTED *************************************
  submitted = false;

  // ******** LOAD GENRE INFORMATION WHEN WE CHOOSE SOME MODAL ************
  genreInformation: any;
  private genreId: string;

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

  constructor(
    private titleService: TitleService,
    private modalService: NgbModal,
    private genreFormsModal: GenreFormsModal
  ) {
    this.registerForm = this.genreFormsModal.registerForm();
    this.updateForm = this.genreFormsModal.updateForm();

    // ******** INITIALIZATION VARIABLES THAT GOING TO PAGINATION *******
    this.initializateUserComponentChild();
  }

  // **************************************************** VALUES FROM CHILD ************************************************
  ngOnInit(): void {
    this.titleService.updateTitle(LABEL.GENRES);
  }

  async takeAction($event: any) {
    this.action = $event[0];
    const genre = $event[1];

    if (genre) this.genreInformation = genre;

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

  // **************************************************** REGISTER ************************************************
  async openRegister(content: any) {
    await this.openModal(content);
    this.closeAction();
  }

  get getControlRegister() {
    return this.registerForm.controls;
  }

  register() {
    this.genreFormsModal
      .registerGenre(this.registerForm, this.modalElement)
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

  // **************************************************** UPDATE ************************************************
  async openUpdate(content: any) {
    this.genreId = this.genreInformation.id || 'no_id';

    this.updateForm.setValue({
      name: this.genreInformation.name || '',
    });

    await this.openModal(content);
    this.closeAction();
  }

  get getControlUpdate() {
    return this.updateForm.controls;
  }

  update() {
    this.genreFormsModal
      .updateGenre(this.updateForm, this.modalElement, this.genreId)
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
  }

  editTransition() {
    this.modalElement.close();

    this.action = 'edit';
    this.openUpdate(this.contentUpdate);
  }

  unblockTransition() {
    this.modalElement.close();

    if (this.genreInformation.active !== false) {
      this.action = 'block';
      this.blockForm();
    } else {
      this.action = 'unblock';
      this.unblockForm();
    }
  }

  // **************************************************** DELETE ************************************************

  async blockForm() {
    const result = await alertWithTwoOptions(
      'Block Genre',
      'Do you want to block this genre?',
      'No.',
      '<i class="fas fa-lock"></i>&nbsp;Yes.'
    );
    if (result === false) this.unblock(this.genreInformation.id, false);
  }

  async unblockForm() {
    const result = await alertWithTwoOptions(
      'Unblock user',
      'Do you want to unblock this user?',
      'No.',
      '<i class="fas fa-lock-open"></i>&nbsp;Yes.'
    );
    if (result === false) this.unblock(this.genreInformation.id, true);
  }

  unblock(id: any, unblock: boolean) {
    this.genreFormsModal
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
    this.query = getGenres;
    // this.context = {};

    this.include = true;
    // this.itemsPage = 5;

    this.dataList = {
      definitionKey: 'genres',
      listKey: 'genres',
    };

    this.columns = [
      {
        label: '#',
        property: 'id',
      },
      {
        label: 'Genres name',
        property: 'name',
      },
      {
        label: 'Slug',
        property: 'slug',
      },
      {
        label: 'Active?',
        property: 'active',
      },
    ];
  }
}
