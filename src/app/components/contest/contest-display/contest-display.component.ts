import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../services/Message/message.service';
import {ContestService} from '../../../services/Contest/contest.service';
import {ContestDetails} from '../../../DTOs/ContestDetails.model';
import {DeleteParticipationButtonComponent} from '../../dog/dog-details/delete-participation-button.component';

@Component({
  selector: 'app-contest-display',
  templateUrl: './contest-display.component.html',
  styleUrls: ['./contest-display.component.css']
})
export class ContestDisplayComponent implements OnInit {

  contest: ContestDetails;
  participations = [];
  tableSettings = {};
  placeName: string;
  startDate: string;
  endDate: string;

  constructor(private titleService: Title,
              private router: Router,
              private messageService: MessageService,
              private contestService: ContestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.titleService.setTitle('Szczegóły konkursu');
    const id = +this.route.snapshot.paramMap.get('id');

    this.contestService.getContestById(id).subscribe(
      data => {
        this.contest = data;
        this.participations = data.participants;
        this.placeName = data.contestId === -1 ? 'Nie ustawiono' : data.placeName;
        this.startDate = data.contestId === -1 ? 'Nie ustawiono' : data.startDate;
        this.endDate = data.contestId === -1 ? 'Nie ustawiono' : data.endDate;
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
        name: {
          title: 'Nazwa',
          editable: false
        },
        breedName: {
          title: 'Rasa',
          editable: false
        },
        chipNumber: {
          title: 'Nr chipa/tatuażu',
          editable: false
        },
        grade: {
          title: 'Ocena',
          editable: false
        },
        description: {
          title: 'Uzasadnienie',
          width: '20%',
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
          renderComponent: DeleteParticipationButtonComponent,
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
    this.participations = this.participations.filter(participation => participation.participationId !== participationId);
  }
}
