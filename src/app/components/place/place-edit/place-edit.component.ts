import {Component, OnInit} from '@angular/core';
import {Place} from '../../../models/Place.model';
import {PlaceService} from '../../../services/Place/place.service';
import {MessageService} from '../../../services/Message/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css']
})
export class PlaceEditComponent implements OnInit {

  editForm: FormGroup;
  isProcessing = true;
  isSubmitted = false;
  place: Place;

  constructor(private formBuilder: FormBuilder,
              private placeService: PlaceService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.placeService.getPlace(id).subscribe(
      data => {
        this.place = data;
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

    this.editForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.isProcessing = false;

  }

  get f() {
    return this.editForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.editForm.invalid) {
      return;
    }

    this.isProcessing = true;
    this.placeService.editPlace(this.place.placeId, this.place)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['place']).then(() => {
            this.messageService.removeMessages();
            this.messageService.addSuccess('Edytowano!');
          });
        },
        error => {
          if (error.error && error.error.message) {
            this.messageService.addError(error.error.message);
          } else if (error.status !== null && error.status === 0) {
            this.messageService.addError('Brak połączenia z serwerem API!');
          } else if (error.status !== null && error.status === 401) {
            this.messageService.addError('Błędny użytkownik!');
          } else {
            this.messageService.addError('Błąd edycji');
          }
          this.isProcessing = false;
        });
  }

}
