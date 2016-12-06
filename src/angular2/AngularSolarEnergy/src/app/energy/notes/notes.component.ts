import { NgForm } from '@angular/forms';
import { AfterViewChecked, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

/**
 * A forms example for adding notes.
 * I ended up with a pretty complex setup for a simple form, but I was following the template example.
 * see: https://angular.io/docs/ts/latest/cookbook/form-validation.html#!#template1
 */
export class NotesComponent implements AfterViewChecked {
  notesForm: NgForm;
  @ViewChild('notesForm') currentForm: NgForm;
  public notes: INote[] = [];
  /**
   * The current note being added.
   */
  public currentNote = { name: '', body: '' };
  public submitted = false;

  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  public active = true;
  public formErrors = {
    'notesNameInput': '', 
    'notesBodyInput': ''
  };
  private validationMessages = {
    'noteNameInput': {
      'required':  'Note name is required.',
      'minlength': 'Note name must be at least 4 characters long.',
      'maxlength': 'Note name cannot be more than 20 characters long.'
    },
    'noteBodyInput': {
      'required': 'Note text is required.',
      'minlength': 'Note text must be at least 4 characters long.',
      'maxlength': 'Note text cannot be more than 250 characters long.'
    }
  };
  constructor() { }

  onSubmit() {
    this.saveNote();
    this.submitted = true;
    this.active = false;
    this.currentNote = {name: '', body: ''};
    setTimeout(() => this.active = true, 0);
  }

  private saveNote() {
    this.notes.push(this.currentNote);
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.notesForm) { return; }
    this.notesForm = this.currentForm;
    if (this.notesForm) {
      this.notesForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.notesForm) { return; }
    const form = this.notesForm.form;

    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}

interface INote {
  name: string;
  body: string;
}
