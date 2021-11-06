import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DocumentNode } from 'graphql';

import { GenreFormsModal } from './forms/genre.forms.modal';
import { getGenres } from 'src/app/@graphql/operators/query/genre.query';

import { alertWithTwoOptions } from '../../shared/alerts/alerts';
import { mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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
    private modalService: NgbModal,
    private genreFormsModal: GenreFormsModal
  ) {
    this.registerForm = this.genreFormsModal.registerForm();
    this.updateForm = this.genreFormsModal.updateForm();

    // ******** INITIALIZATION VARIABLES THAT GOING TO PAGINATION *******
    this.initializateUserComponentChild();
  }

  // **************************************************** VALUES FROM CHILD ************************************************
  ngOnInit(): void {}

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
        this.deleteForm();
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

  deleteTransition() {
    this.modalElement.close();

    this.action = 'block';
    this.deleteForm();
  }

  // **************************************************** DELETE ************************************************

  async deleteForm() {
    const result = await alertWithTwoOptions(
      'Genre Block',
      'Do you want to block this genre?',
      'No.',
      'Yes.'
    );
    if (result === false) this.delete(this.genreInformation.id);
  }

  delete(id: any) {
    this.genreFormsModal
      .blockGenre(id)
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
    ];
  }
}
