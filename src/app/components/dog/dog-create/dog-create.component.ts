import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DogService} from '../../../services/Dog/dog.service';
import {MessageService} from '../../../services/Message/message.service';
import {BreedGroup} from '../../../models/BreedGroup.model';
import {BreedSection} from '../../../models/BreedSection.model';
import {DogBreed} from '../../../models/DogBreed.model';
import {Dog} from '../../../models/Dog.model';

@Component({
  selector: 'app-dog-create',
  templateUrl: './dog-create.component.html',
  styleUrls: ['./dog-create.component.css']
})
export class DogCreateComponent implements OnInit {

  registerForm: FormGroup;
  isProcessing = false;
  isSubmitted = false;
  groups: BreedGroup[];
  sections: BreedSection[];
  breeds: DogBreed[];
  dog: Dog;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private dogService: DogService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.dogService.getAllGroups().subscribe(
      data => {
        this.groups = data;
        console.log(this.groups);
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

    this.registerForm = this.formBuilder.group({
      breedId: ['', Validators.required]
    });
  }

  getSections(groupID: number) {
    this.dogService.getSectionsInGroup(groupID).subscribe(
      data => {
        this.sections = data;
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

  getBreeds(sectionID: number) {
    this.dogService.getBreedsInSection(sectionID).subscribe(
      data => {
        this.breeds = data;
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

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.dog = {
      dogID: 0,
      ownerID: 0,
      breedID: this.f.breedId.value,
      classID: 0,
      name: '',
      lineageNumber: '',
      registrationNumber: '',
      titles: '',
      chipNumber: '',
      sex: '',
      birthday: '',
      fatherName: '',
      motherName: '',
      breederName: '',
      breederAddress: ''
    };
    console.log(this.dog);
  }

}
