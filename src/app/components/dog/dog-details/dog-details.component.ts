import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {DogService} from '../../../services/Dog/dog.service';
import {MessageService} from '../../../services/Message/message.service';
import {DogDetails} from '../../../DTOs/DogDetails.model';
import {DeleteContestButtonComponent} from '../../contest/contest-list/delete-contest-button.component';
import {ContestService} from '../../../services/Contest/contest.service';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.css']
})
export class DogDetailsComponent implements OnInit {

  dog: DogDetails;
  contests = [];
  tableSettings = {};

  constructor(private titleService: Title,
              private router: Router,
              private dogService: DogService,
              private messageService: MessageService,
              private contestService: ContestService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.titleService.setTitle('Szczegóły psa');
    const id = +this.route.snapshot.paramMap.get('id');
    this.dogService.getDogDetailsByID(id).subscribe(
      data => {
        this.dog = data;
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

    this.contestService.getEntriedContestsByDogId(id).subscribe(
      data => {
        this.contests = data;
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

    this.tableSettings = {
      columns: {
        contestName: {
          title: 'Nazwa',
          editable: false
        },
        grade: {
          title: 'Ocena',
          editable: false
        },
        place: {
          title: 'Miejsce',
          editable: false
        },
        delete: {
          title: '',
          type: 'custom',
          filter: false,
          sort: false,
          width: '15%',
          renderComponent: DeleteContestButtonComponent,
          onComponentInitFunction: (instance) => {
            instance.deletedItem.subscribe(participationId => {
              this.handleDelete(participationId);
            });
          }
        }
      },
      actions: {
        add: false,
        delete: false,
        edit: false
      },
      noDataMessage: 'Nie odnaleziono danych'
    };
  }

  private handleDelete(participationId: number) {
    this.contests = this.contests.filter(participation => participation.participationId !== participationId);
  }

}
