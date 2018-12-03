import { Component, OnInit } from '@angular/core';
import {ContestDetails} from '../../../DTOs/ContestDetails.model';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../services/Message/message.service';
import {ContestService} from '../../../services/Contest/contest.service';
import {GradeTableComponent} from './grade-table.component';

@Component({
  selector: 'app-contest-grade',
  templateUrl: './contest-grade.component.html',
  styleUrls: ['./contest-grade.component.css']
})
export class ContestGradeComponent implements OnInit {

  contest: ContestDetails;
  participations = [];
  tableSettings = {};
  grades = [];

  constructor(private titleService: Title,
              private router: Router,
              private messageService: MessageService,
              private contestService: ContestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.titleService.setTitle('Ocenianie konkursu');
    const id = +this.route.snapshot.paramMap.get('id');

    this.contestService.getContestById(id).subscribe(
      data => {
        this.contest = data;
        this.participations = data.participants;
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

    this.contestService.getAllGrades().subscribe(
      data => {
        this.grades = data;
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
        className: {
          title: 'Klasa',
          editable: false
        },
        grade: {
          title: '',
          type: 'custom',
          filter: false,
          sort: false,
          width: '30%',
          valuePrepareFunction: (cell, row) => this.grades,
          renderComponent: GradeTableComponent
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

}
