import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {DogService} from '../../../services/Dog/dog.service';
import {MessageService} from '../../../services/Message/message.service';
import {Dog} from '../../../models/Dog.model';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.css']
})
export class DogDetailsComponent implements OnInit {

  dog: Dog;
  className: string;
  breedName: string;


  constructor(private titleService: Title,
              private router: Router,
              private dogService: DogService,
              private messageService: MessageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.titleService.setTitle('Szczegóły psa');
    const id = +this.route.snapshot.paramMap.get('id');
    this.dogService.getDogByID(id).subscribe(
      data => {
          this.dog = data;
          this.dogService.getBreedById(this.dog.breedID).subscribe(
            dataB => {
              this.breedName = dataB.namePolish;
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
        this.dogService.getClassById(this.dog.classID).subscribe(
          dataC => {
            this.className = dataC.namePolish;
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
    )
  }

}
