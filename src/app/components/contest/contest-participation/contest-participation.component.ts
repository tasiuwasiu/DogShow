import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../services/Message/message.service';
import {DogService} from '../../../services/Dog/dog.service';
import {ContestService} from '../../../services/Contest/contest.service';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AuthorizationService} from '../../../services/Authorization/authorization.service';
import {first} from 'rxjs/operators';
import {Participation} from '../../../models/Participation.model';

@Component({
  selector: 'app-contest-participation',
  templateUrl: './contest-participation.component.html',
  styleUrls: ['./contest-participation.component.css']
})
export class ContestParticipationComponent implements OnInit {

  isSubmitted = false;
  isProcessing = false;

  dogDropdownList = [];
  dogSelectedItems = [];
  dogDropdownSettings = {};
  dogError = false;

  contestDropdownList = [];
  contestSelectedItems = [];
  contestDropdownSettings = {};
  contestError = false;

  participation: Participation;

  constructor(private messageService: MessageService,
              private dogService: DogService,
              private contestService: ContestService,
              private titleService: Title,
              private router: Router,
              private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Zapis na konkurs');
    this.dogService.getDogsByUserID(this.authorizationService.getCurrentUserID()).subscribe(
      data => {
        this.dogDropdownList = data;
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

    this.contestDropdownSettings = {
      singleSelection: true,
      idField: 'contestTypeId',
      textField: 'name',
      enableCheckAll: false,
      allowSearchFilter: true,
      searchPlaceholderText: 'Szukaj',
      noDataAvailablePlaceholderText: 'Wybierz psa',
      closeDropDownOnSelection: true
    };
    this.dogDropdownSettings = {
      singleSelection: true,
      idField: 'dogId',
      textField: 'name',
      enableCheckAll: false,
      allowSearchFilter: true,
      searchPlaceholderText: 'Szukaj',
      noDataAvailablePlaceholderText: 'Brak danych',
      closeDropDownOnSelection: true
    };
  }

  onDogSelected(dog: any) {
    this.contestSelectedItems = [];
    this.contestDropdownList = [];

    if (dog.dogId === null) {
      this.messageService.addError('Błąd wyboru psa');
      return;
    }

    this.contestService.getAvaiableContestsByDogId(dog.dogId).subscribe(
      data => {
        this.contestDropdownList = data;
        this.isProcessing = false;
      },
      error => {
        if (error.error && error.error.message) {
          this.messageService.addError(error.error.message);
        } else if (error.status !== null && error.status === 0) {
          this.messageService.addError('Brak połączenia z serwerem API!');
        } else {
          this.messageService.addError('Błąd zapisu');
        }
        this.isProcessing = false;
      }
    );
  }

  onSubmit() {
    this.isSubmitted = true;

    this.contestError = this.contestSelectedItems.length !== 1;
    this.dogError = this.dogSelectedItems.length !== 1;
    if (this.dogError || this.contestError) {
      return;
    }

    this.isProcessing = true;

    this.participation = {
      participationId: 0,
      dogId: this.dogSelectedItems[0].dogId,
      contestId: this.contestSelectedItems[0].contestTypeId,
      description: ''
    };

    this.contestService.participate(this.participation)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/dog/list']).then(() => {
            this.messageService.removeMessages();
            this.messageService.addSuccess('Zapisano psa na konkurs!');
          });
        },
        error => {
          this.messageService.removeMessages();
          if (error.error && error.error.message) {
            this.messageService.addError(error.error.message);
          } else if (error.status !== null && error.status === 0) {
            this.messageService.addError('Brak połączenia z serwerem API!');
          } else {
            this.messageService.addError('Błąd zapisu');
          }
          this.isProcessing = false;
        }
      );
  }


}
