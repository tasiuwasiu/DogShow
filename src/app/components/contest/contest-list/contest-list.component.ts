import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../services/Authorization/authorization.service';
import {MessageService} from '../../../services/Message/message.service';
import {Title} from '@angular/platform-browser';
import {ContestService} from '../../../services/Contest/contest.service';

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
        chipNumber: {
          title: 'Nr chipu',
          editable: false
        }
      },
      actions: {
        add: false,
        delete: false,
        edit: false
      }
    };
  }

}
