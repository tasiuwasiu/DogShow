import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DogService} from '../../../services/Dog/dog.service';
import {MessageService} from '../../../services/Message/message.service';
import {BreedGroup} from '../../../models/BreedGroup.model';
import {BreedSection} from '../../../models/BreedSection.model';
import {DogBreed} from '../../../models/DogBreed.model';
import {Dog} from '../../../models/Dog.model';
import {AuthorizationService} from '../../../services/Authorization/authorization.service';
import {DogClass} from '../../../models/DogClass.model';
import {V} from '@angular/core/src/render3';
import {first} from 'rxjs/operators';

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
  classes: DogClass[];
  dog: Dog;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private dogService: DogService,
              private messageService: MessageService,
              private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.dogService.getAllGroups().subscribe(
      data => {
        this.groups = data;
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

    this.dogService.getClasses().subscribe(
      data => {
        this.classes = data;
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
      breedId: ['', Validators.required],
      classId: ['', Validators.required],
      name: ['', Validators.required],
      lineageNumber: [''],
      registrationNumber: [''],
      titles: [''],
      chipNumber: ['', Validators.required],
      sex: ['', Validators.required],
      birthday: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      breederName: ['', Validators.required],
      breederAddress: ['', Validators.required]
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
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.dog = {
      dogID: 0,
      ownerID: this.authorizationService.getCurrentUserID(),
      breedID: this.f.breedId.value,
      classID: this.f.classId.value,
      name: this.f.name.value,
      lineageNumber: this.f.lineageNumber.value,
      registrationNumber: this.f.registrationNumber.value,
      titles: this.f.titles.value,
      chipNumber: this.f.chipNumber.value,
      sex: this.f.sex.value,
      birthday: this.f.birthday.value,
      fatherName: this.f.fatherName.value,
      motherName: this.f.motherName.value,
      breederName: this.f.breederName.value,
      breederAddress: this.f.breederAddress.value
    };

    this.isProcessing = true;
    this.dogService.addDog(this.dog)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/dog/list']).then(() => {
            this.messageService.removeMessages();
            this.messageService.addSuccess('Zarejestrowano psa: ' + this.dog.name);
          });
        },
        error => {
          if (error.error && error.error.message) {
            this.messageService.addError(error.error.message);
          } else if (error.status !== null && error.status === 0) {
            this.messageService.addError('Brak połączenia z serwerem API!');
          } else {
            this.messageService.addError('Błąd rejestracji');
          }
          this.isProcessing = false;
        }
      );
  }

}
