import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlaceService} from '../../../services/Place/place.service';
import {MessageService} from '../../../services/Message/message.service';
import {first} from 'rxjs/operators';
import {Place} from '../../../models/Place.model';

@Component({
  selector: 'app-place-create',
  templateUrl: './place-create.component.html',
  styleUrls: ['./place-create.component.css']
})
export class PlaceCreateComponent implements OnInit {

  createForm: FormGroup;
  isProcessing = false;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder,
              private placeService: PlaceService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      placeName: ['', Validators.required]
    });
  }

  get f() {
    return this.createForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.createForm.invalid) {
      return;
    }
    const newPlace: Place = {
      placeId: 0,
      name: this.f.placeName.value
    };

    this.isProcessing = true;
    this.placeService.addPlace(newPlace)
      .pipe(first())
      .subscribe(
        data => {
          this.messageService.removeMessages();
          this.messageService.addSuccess('Dodano miejsce: ' + this.f.placeName.value);
          this.isProcessing = false;
        },
        error => {
          if (error.error && error.error.message) {
            this.messageService.addError(error.error.message);
          } else if (error.status !== null && error.status === 0) {
            this.messageService.addError('Brak połączenia z serwerem API!');
          } else {
            this.messageService.addError('Błąd dodawania miejsca');
          }
          this.isProcessing = false;
        }
      );
  }

}
