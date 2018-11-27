import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../services/Authorization/authorization.service';
import {MessageService} from '../../../services/Message/message.service';
import {Title} from '@angular/platform-browser';
import {ContestService} from '../../../services/Contest/contest.service';
import {EditContestButtonComponent} from './edit-contest-button.component';
import {DeleteContestButtonComponent} from './delete-contest-button.component';

@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.css']
})
export class ContestListComponent implements OnInit {

  contests = [];
  tableSettings = {};

  constructor(private authorizationService: AuthorizationService,
              private messageService: MessageService,
              private titleService: Title,
              private contestService: ContestService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Lista konkursów');

    this.contestService.getContests().subscribe(
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
      });

    this.tableSettings = {
      columns: {
        name: {
          title: 'Nazwa',
          editable: false
        },
        placeName: {
          title: 'Miejsce',
          editable: false,
          valuePrepareFunction: (value, row) => {
            if (row.contestId === -1) {
              return 'Nie zaplanowano';
            } else {
              return value;
            }
          }
        },
        startDate: {
          title: 'Termin rozpoczęcia',
          editable: false,
          valuePrepareFunction: (value, row) => {
            if (row.contestId === -1) {
              return 'Nie zaplanowano';
            } else {
              return value;
            }
          }
        },
        endDate: {
          title: 'Termin zakończenia',
          editable: false,
          valuePrepareFunction: (value, row) => {
            if (row.contestId === -1) {
              return 'Nie zaplanowano';
            } else {
              return value;
            }
          }
        },
        edit: {
          title: '',
          type: 'custom',
          filter: false,
          sort: false,
          width: '15%',
          renderComponent: EditContestButtonComponent
        },
        delete: {
          title: '',
          type: 'custom',
          filter: false,
          sort: false,
          width: '15%',
          renderComponent: DeleteContestButtonComponent,
          onComponentInitFunction: (instance) => {
            instance.deletedItem.subscribe(contestTypeId => {
              this.handleDelete(contestTypeId);
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

  private handleDelete(contestTypeId: number) {
    this.contests = this.contests.filter(contest => contest.contestTypeId !== contestTypeId);
  }

}
