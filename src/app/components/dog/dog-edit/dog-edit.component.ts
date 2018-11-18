import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreedGroup} from '../../../models/BreedGroup.model';
import {BreedSection} from '../../../models/BreedSection.model';
import {DogBreed} from '../../../models/DogBreed.model';
import {DogClass} from '../../../models/DogClass.model';
import {Dog} from '../../../models/Dog.model';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {DogService} from '../../../services/Dog/dog.service';
import {MessageService} from '../../../services/Message/message.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-dog-edit',
  templateUrl: './dog-edit.component.html',
  styleUrls: ['./dog-edit.component.css']
})
export class DogEditComponent implements OnInit {

  registerForm: FormGroup;
  isProcessing = false;
  isSubmitted = false;
  groups: BreedGroup[];
  sections: BreedSection[];
  breeds: DogBreed[];
  classes: DogClass[];
  dog: Dog;

  today = new Date();

  constructor(private titleService: Title,
              private formBuilder: FormBuilder,
              private router: Router,
              private dogService: DogService,
              private messageService: MessageService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.titleService.setTitle('Edycja psa');
    this.isProcessing = true;
    const id = +this.route.snapshot.paramMap.get('id');
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

    this.dogService.getDogByID(id).subscribe(
      data => {
        this.dog = data;
        const offset = (new Date()).getTimezoneOffset() * 60000;
        this.dog.birthday = (new Date(this.dog.birthday + offset)).toISOString().slice(0, -1);
        this.dogService.getGroupSectionFromBreed(this.dog.breedID).subscribe(
          dataB => {
            // setgroup
            this.getSections(dataB.groupId);
            // setsection

            this.isProcessing = false;
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
    );

    this.registerForm = this.formBuilder.group({
      breedId: [this.dog.breedID, Validators.required],
      classId: [this.dog.classID, Validators.required],
      name: [this.dog.name, Validators.required],
      lineageNumber: [this.dog.lineageNumber],
      registrationNumber: [this.dog.registrationNumber],
      titles: [this.dog.titles],
      chipNumber: [this.dog.chipNumber, Validators.required],
      sex: [this.dog.sex, Validators.required],
      birthday: [this.dog.birthday, Validators.required],
      fatherName: [this.dog.fatherName, Validators.required],
      motherName: [this.dog.motherName, Validators.required],
      breederName: [this.dog.breederName, Validators.required],
      breederAddress: [this.dog.breederAddress, Validators.required]
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
    const date = this.f.birthday.value;
    const offset = (new Date()).getTimezoneOffset() * 60000;
    const correctDate = (new Date(date - offset)).toISOString().slice(0, -1);

    this.dog = {
      dogID: this.dog.dogID,
      ownerID: this.dog.ownerID,
      breedID: this.f.breedId.value,
      classID: this.f.classId.value,
      name: this.f.name.value,
      lineageNumber: this.f.lineageNumber.value,
      registrationNumber: this.f.registrationNumber.value,
      titles: this.f.titles.value,
      chipNumber: this.f.chipNumber.value,
      sex: this.f.sex.value,
      birthday: correctDate,
      fatherName: this.f.fatherName.value,
      motherName: this.f.motherName.value,
      breederName: this.f.breederName.value,
      breederAddress: this.f.breederAddress.value
    };

    console.log (this.dog);

    this.isProcessing = true;
    this.dogService.editDog(this.dog.dogID,this.dog)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/dog/list']).then(() => {
            this.messageService.removeMessages();
            this.messageService.addSuccess('Edytowano psa: ' + this.dog.name);
          });
        },
        error => {
          if (error.error && error.error.message) {
            this.messageService.addError(error.error.message);
          } else if (error.status !== null && error.status === 0) {
            this.messageService.addError('Brak połączenia z serwerem API!');
          } else {
            this.messageService.addError('Błąd edycji');
          }
          this.isProcessing = false;
        }
      );

  }
}
