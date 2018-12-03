import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {Router} from '@angular/router';
import {MessageService} from '../../../services/Message/message.service';
import {ContestService} from '../../../services/Contest/contest.service';
import {Grade} from '../../../DTOs/Grade.model';
import {SaveGrade} from '../../../DTOs/SaveGrade.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DogService} from '../../../services/Dog/dog.service';


@Component({
  selector: 'app-details-contest-button-view',
  template: `
    <form [formGroup]="gradeForm" (ngSubmit)="onClick()">

      <div class="form-group row form-row">
        <label class="col-lg-3">Ocena</label>
      <select id="gradeId" formControlName="gradeId" class="col-lg-9">
        <option value=""></option>
        <option *ngFor="let grade of value" value={{grade.gradeId}}>
        {{grade.namePolish}}
        </option>
      </select>
        <div *ngIf="isSubmitted && f.grade.errors" class="invalid-feedback col-lg-7 d-block">
          <div>Wybierz ocenę</div>
        </div>
      </div>

      <div class="form-group row form-row">
        <label class="col-lg-3">Finalista?</label>
        <label class="col-lg-4">
          <input type="radio" name="isFinalist" formControlName="isFinalist" [value]="true"/>Tak
        </label>
        <label class="col-lg-4">
          <input type="radio" name="isFinalist" formControlName="isFinalist" [value]="false"/>Nie
        </label>
        <div *ngIf="isSubmitted && f.isFinalist.errors" class="invalid-feedback col-lg-7 d-block">
          <div>Wybierz opcję</div>
        </div>
      </div>

      <div class="form-group row form-row">
        <label class="col-lg-3">Miejsce</label>
        <select id="place" formControlName="place" class="col-lg-9">
          <option value=""></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <button type="button" class="btn btn-success  text-white" disabled="isProcessing">Zapisz</button>

    </form>
  `,
})
export class GradeTableComponent implements OnInit {

  isSubmitted: boolean;
  isProcessing: boolean;
  gradeForm: FormGroup;

  constructor(private messageService: MessageService,
              private contestService: ContestService,
              private formBuilder: FormBuilder) {
  }

  @Input() value: Grade[];
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {

    this.gradeForm = this.formBuilder.group({
      gradeId: [this.rowData.gradeId, Validators.required],
      isFinalist: [this.rowData.place !== 'Nie przyznano', Validators.required],
      place: [this.rowData.place]
    });
  }

  onClick() {
    this.isSubmitted = true;
    if (this.gradeForm.invalid) {
      return true;
    }
    this.isProcessing = true;
    const grade: SaveGrade = {
      participationId: this.rowData.participationId,
      gradeId: this.f.gradeId.value,
      isFinalist: this.f.isFinalist.value,
      place: this.f.place.value
    };

    this.contestService.saveGrade(grade).subscribe(
      data => {
        this.messageService.removeMessages();
        this.messageService.addSuccess('Zapisano ocenę dla ' + this.rowData.name);
        this.isProcessing = false;
      },
      error => {
        this.isProcessing = false;
        if (error.error && error.error.message) {
          this.messageService.addError(error.error.message);
        } else if (error.status !== null && error.status === 0) {
          this.messageService.addError('Brak połączenia z serwerem API!');
        } else {
          this.messageService.addError('Błąd zapisu');
        }
      }
    );
  }

  get f() {
    return this.gradeForm.controls;
  }

}
