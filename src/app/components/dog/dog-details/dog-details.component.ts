import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {DogService} from '../../../services/Dog/dog.service';
import {MessageService} from '../../../services/Message/message.service';
import {DogDetails} from '../../../DTOs/DogDetails.model';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.css']
})
export class DogDetailsComponent implements OnInit {

  dog: DogDetails;

  constructor(private titleService: Title,
              private router: Router,
              private dogService: DogService,
              private messageService: MessageService,
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
    )
  }

}
