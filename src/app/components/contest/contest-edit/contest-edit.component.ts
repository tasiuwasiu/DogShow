import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaceService} from '../../../services/Place/place.service';
import {ContestService} from '../../../services/Contest/contest.service';
import {MessageService} from '../../../services/Message/message.service';
import {first} from 'rxjs/operators';
import {ContestDetails} from '../../../DTOs/ContestDetails.model';

@Component({
  selector: 'app-contest-edit',
  templateUrl: './contest-edit.component.html',
  styleUrls: ['./contest-edit.component.css']
})
export class ContestEditComponent implements OnInit {


  placeDropdownList = [];
  placeSelectedItems = [];
  placeDropdownSettings = {};
  placeError = false;
  editForm: FormGroup;
  isProcessing = false;
  isSubmitted = false;
  contest: ContestDetails;
  newContest: ContestDetails;

  constructor(private titleService: Title,
              private formBuilder: FormBuilder,
              private router: Router,
              private placeService: PlaceService,
              private contestService: ContestService,
              private messageService: MessageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.titleService.setTitle('Edycja konkursu');
    const id = +this.route.snapshot.paramMap.get('id');

    this.editForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      name: ['', Validators.required],
      isEnterable: [true, Validators.required]
    });

    this.contestService.getContestById(id).subscribe(
      data => {
        this.contest = data;
        this.placeService.getAllPlaces().subscribe(
          datab => {
            this.placeDropdownList = datab;
            this.placeSelectedItems = this.placeDropdownList.filter(p => p.placeId === this.contest.placeId);
            this.prepareForm();
          },
          error => {
            if (error.error && error.error.message) {
              this.messageService.addError(error.error.message);
            } else if (error.status !== null && error.status === 0) {
              this.messageService.addError('Brak połączenia z serwerem API!');
            } else {
              this.messageService.addError('Błąd pobierania');
            }
          }
        );
      },
      error => {
        if (error.error && error.error.message) {
          this.messageService.addError(error.error.message);
        } else if (error.status !== null && error.status === 0) {
          this.messageService.addError('Brak połączenia z serwerem API!');
        } else {
          this.messageService.addError('Błąd pobierania');
        }
      }
    );

    this.placeDropdownSettings = {
      singleSelection: true,
      idField: 'placeId',
      textField: 'name',
      enableCheckAll: false,
      allowSearchFilter: true,
      searchPlaceholderText: 'Szukaj',
      noDataAvailablePlaceholderText: 'Brak danych',
      closeDropDownOnSelection: true
    };


  }

  prepareForm() {
    this.f.startDate.setValue(this.contest.startDate);
    this.f.endDate.setValue(this.contest.endDate);
    this.f.name.setValue(this.contest.name);
    this.f.isEnterable.setValue(this.contest.isEnterable);
  }

  get f() {
    return this.editForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    this.placeError = this.placeSelectedItems.length !== 1;
    if (this.editForm.invalid) {
      return;
    }
    if (this.placeError) {
      return;
    }

    this.isProcessing = true;
    const startDate = this.f.startDate.value;
    const endDate = this.f.endDate.value;
    const offset = (new Date()).getTimezoneOffset() * 60000;
    const correctStartDate = (new Date(startDate - offset)).toISOString().slice(0, -1);
    const correctEndDate = (new Date(endDate - offset)).toISOString().slice(0, -1);

    this.newContest = {
      contestId: this.contest.contestId,
      contestTypeId: this.contest.contestTypeId,
      startDate: correctStartDate,
      endDate: correctEndDate,
      placeId: this.placeSelectedItems[0].placeId,
      name: this.f.name.value,
      isEnterable: this.f.isEnterable.value,
      placeName: '',
      allowedBreeds: [],
      participants: []
    };

    this.contestService.editContest(this.contest.contestTypeId, this.newContest)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/contest/list']).then(() => {
            this.messageService.removeMessages();
            this.messageService.addSuccess('Edytowano konkurs: ' + this.newContest.name);
          });
        },
        error => {
          if (error.error && error.error.message) {
            this.messageService.addError(error.error.message);
          } else if (error.status !== null && error.status === 0) {
            this.messageService.addError('Brak połączenia z serwerem API!');
          } else {
            this.messageService.addError('Błąd edycji');
          }
          this.isProcessing = false;
        }
      );
  }

}
