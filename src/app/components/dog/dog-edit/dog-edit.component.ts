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
  classes: DogClass[];
  dogBreed: string;
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

    this.dogService.getClasses().subscribe(
      data => {
        this.classes = data;
        this.downloadDog();
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

  private downloadDog() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dogService.getDogByID(id).subscribe(
      data => {
        this.dog = data;
        console.log(this.dog);
        this.setValues();
        this.dogService.getBreedById(this.dog.breedId).subscribe(
          dataB => {
            this.dogBreed = dataB.namePolish;
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
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      return;
    }
    const date = this.f.birthday.value;
    const offset = (new Date()).getTimezoneOffset() * 60000;
    const correctDate = (new Date(date - offset)).toISOString().slice(0, -1);

    this.dog = {
      dogId: this.dog.dogId,
      ownerId: this.dog.ownerId,
      breedId: this.dog.breedId,
      classId: this.f.classId.value,
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

    console.log(this.dog);

    this.isProcessing = true;
    this.dogService.editDog(this.dog.dogId, this.dog)
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

  private setValues() {
    this.f.classId.setValue(this.dog.classId);
    this.f.name.setValue(this.dog.name);
    this.f.lineageNumber.setValue(this.dog.lineageNumber);
    this.f.registrationNumber.setValue(this.dog.registrationNumber);
    this.f.titles.setValue(this.dog.titles);
    this.f.chipNumber.setValue(this.dog.chipNumber);
    this.f.sex.setValue(this.dog.sex);
    this.f.birthday.setValue(this.dog.birthday);
    this.f.fatherName.setValue(this.dog.fatherName);
    this.f.motherName.setValue(this.dog.motherName);
    this.f.breederName.setValue(this.dog.breederName);
    this.f.breederAddress.setValue(this.dog.breederAddress);
  }
}
