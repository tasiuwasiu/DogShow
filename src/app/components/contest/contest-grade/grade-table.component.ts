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

      <!--<div class="form-group row form-row">
        <label class="col-lg-3">Ocena</label>
        <select id="gradeId" formControlName="gradeId" class="col-lg-9">
          <option value=""></option>
          <option *ngFor="let grade of value" [value]="grade.gradeId" >
          {{grade.namePolish}}
          </option>
        </select>
        <div *ngIf="isSubmitted && f.gradeId.errors" class="invalid-feedback col-lg-7 d-block">
          <div>Wybierz ocenę</div>
        </div>
      </div>-->

      <div class="form-group row form-row">
        <label class="col-lg-3">Ocena</label>
        <select id="gradeId" formControlName="gradeId" class="col-lg-9">
          <option value=""></option>
          <option value="1">Doskonała</option>
          <option value="2">Bardzo dobra</option>
          <option value="3">Dobra</option>
          <option value="4">Dostateczna</option>
          <option value="5">Dyskwalifikująca</option>
          <option value="6">Nie do oceny</option>
        </select>
        <div *ngIf="isSubmitted && f.gradeId.errors" class="invalid-feedback col-lg-7 d-block">
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
          <option value="-1"></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <div class="form-group row form-row">
        <label class="col-lg-3">Uzasadnienie</label>
        <textarea class="col-lg-9" formControlName="description"></textarea>
        <div *ngIf="isSubmitted && f.description.errors" class="invalid-feedback col-lg-7 d-block">
          <div>Wprowadź uzasadnienie</div>
        </div>
      </div>
      
      <button type="button" class="btn btn-success  text-white" [disabled]="isProcessing" (click)="onClick()">Zapisz</button>

    </form>
  `,
})
export class GradeTableComponent implements OnInit {

  isSubmitted = false;
  isProcessing = false;
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
      gradeId: [this.rowData.gradeId === 0 ? null : this.rowData.gradeId, Validators.required],
      isFinalist: [this.rowData.place !== 'Nie przyznano', Validators.required],
      place: [this.rowData.place],
      description: [this.rowData.description, Validators.required]
    });
  }

  onClick() {
    this.isSubmitted = true;
    if (this.gradeForm.invalid) {
      return true;
    }
    this.isProcessing = true;

    let grade: SaveGrade;

    if (this.f.isFinalist.value) {
      grade = {
        participationId: this.rowData.participationId,
        gradeId: this.f.gradeId.value,
        isFinalist: true,
        place: this.f.place.value,
        description: this.f.description.value
      };
    } else {
      grade = {
        participationId: this.rowData.participationId,
        gradeId: this.f.gradeId.value,
        isFinalist: false,
        place: -1,
        description: this.f.description.value
      };
    }


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
