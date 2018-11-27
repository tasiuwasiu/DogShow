import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {PlaceService} from '../../../services/Place/place.service';
import {MessageService} from '../../../services/Message/message.service';
import {ContestService} from '../../../services/Contest/contest.service';
import {Contest} from '../../../models/Contest.model';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-contest-create',
  templateUrl: './contest-create.component.html',
  styleUrls: ['./contest-create.component.css']
})
export class ContestCreateComponent implements OnInit {

  contestTypeDropdownList = [];
  contestTypeSelectedItems = [];
  contestTypeDropdownSettings = {};
  contestTypeError = false;

  placeDropdownList = [];
  placeSelectedItems = [];
  placeDropdownSettings = {};
  placeError = false;

  contest: Contest;
  createForm: FormGroup;
  isProcessing = false;
  isSubmitted = false;

  constructor(private titleService: Title,
              private formBuilder: FormBuilder,
              private router: Router,
              private placeService: PlaceService,
              private contestService: ContestService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Planowanie konkursu');
    this.contestService.getAvailableContests().subscribe(
      data => {
        this.contestTypeDropdownList = data;
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
    this.placeService.getAllPlaces().subscribe(
      data => {
        this.placeDropdownList = data;
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
    this.contestTypeDropdownSettings = {
      singleSelection: true,
      idField: 'contestTypeId',
      textField: 'name',
      enableCheckAll: false,
      allowSearchFilter: true
    };
    this.placeDropdownSettings = {
      singleSelection: true,
      idField: 'contestTypeId',
      textField: 'name',
      enableCheckAll: false,
      allowSearchFilter: true
    };
    this.createForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  get f() {
    return this.createForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.createForm.invalid) {
      return;
    }
    this.contestTypeError = this.contestTypeSelectedItems.length !== 1;
    this.placeError = this.contestTypeSelectedItems.length !== 1;
    if (this.placeError || this.contestTypeError) {
      return;
    }

    this.isProcessing = true;

    const startDate = this.f.startDate.value;
    const endDate = this.f.endDate.value;
    const offset = (new Date()).getTimezoneOffset() * 60000;
    const correctStartDate = (new Date(startDate - offset)).toISOString().slice(0, -1);
    const correctEndDate = (new Date(endDate - offset)).toISOString().slice(0, -1);

    this.contest = {
      contestId: 0,
      contestTypeId: this.contestTypeSelectedItems[0].contestTypeId,
      startDate: correctStartDate,
      endDate: correctEndDate,
      placeId: this.placeSelectedItems[0].placeId
    };
    console.log(this.contest);
    this.contestService.planContest(this.contest)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/contest/list']).then(() => {
            this.messageService.removeMessages();
            this.messageService.addSuccess('Zaplanowano konkurs: ' + this.contestTypeSelectedItems[0].name);
          });
        },
        error => {
          if (error.error && error.error.message) {
            this.messageService.addError(error.error.message);
          } else if (error.status !== null && error.status === 0) {
            this.messageService.addError('Brak połączenia z serwerem API!');
          } else {
            this.messageService.addError('Błąd planowania');
          }
          this.isProcessing = false;
        }
        );

  }

}
