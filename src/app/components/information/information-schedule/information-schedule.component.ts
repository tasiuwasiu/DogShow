import { Component, OnInit } from '@angular/core';
import {PlanInfo} from '../../../DTOs/PlanInfo.model';
import {Title} from '@angular/platform-browser'
import {MessageService} from '../../../services/Message/message.service';
import {ContestService} from '../../../services/Contest/contest.service';
import {AuthorizationService} from '../../../services/Authorization/authorization.service';

@Component({
  selector: 'app-information-schedule',
  templateUrl: './information-schedule.component.html',
  styleUrls: ['./information-schedule.component.css']
})
export class InformationScheduleComponent implements OnInit {

  plans: PlanInfo[];

  constructor(private titleService: Title,
              private messageService: MessageService,
              private contestService: ContestService) { }

  ngOnInit() {
    this.titleService.setTitle('Terminarz');

    this.contestService.getPlan().subscribe(
      data => {
        this.plans = data;
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
  }

}
