import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from '../../../services/Message/message.service';
import {ContestService} from '../../../services/Contest/contest.service';
import {DogService} from '../../../services/Dog/dog.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ContestType} from '../../../models/ContestType.model';

@Component({
  selector: 'app-contest-type-create',
  templateUrl: './contest-type-create.component.html',
  styleUrls: ['./contest-type-create.component.css']
})
export class ContestTypeCreateComponent implements OnInit {

  groupDropdownList = [];
  groupSelectedItems = [];
  groupDropdownSettings = {};

  sectionSelected = false;
  sectionDropdownList = [];
  sectionSelectedItems = [];
  sectionDropdownSettings = {};

  breedSelected = false;
  breedDropdownList = [];
  breedSelectedItems = [];
  breedDropdownSettings = {};

  sectionSelectorHelper = [];

  createForm: FormGroup;
  isProcessing = false;
  isSubmitted = false;

  constructor(private router: Router,
              private messageService: MessageService,
              private contestService: ContestService,
              private dogService: DogService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // init group dropdown
    this.dogService.getAllGroups()
      .pipe(first())
      .subscribe(
        data => {
          this.groupDropdownList = data;
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

    this.groupDropdownSettings = {
      singleSelection: false,
      idField: 'groupId',
      textField: 'namePolish',
      enableCheckAll: false,
      allowSearchFilter: true,
      searchPlaceholderText: 'Szukaj',
      noDataAvailablePlaceholderText: 'Brak danych'
    };

    this.sectionDropdownSettings = {
      singleSelection: false,
      idField: 'sectionId',
      textField: 'namePolish',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'Szukaj',
      noDataAvailablePlaceholderText: 'Brak danych'
    };

    this.breedDropdownSettings = {
      singleSelection: false,
      idField: 'breedId',
      textField: 'namePolish',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'Szukaj',
      noDataAvailablePlaceholderText: 'Brak danych'
    };

    // init form
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      isEnterable: [null, Validators.required]
    });

  }

  get f() {
    return this.createForm.controls;
  }

  onSectionSelectorChanged() {
    this.isProcessing = true;
    this.sectionSelectedItems = [];
    this.breedDropdownList = [];
    if (!this.sectionSelected) {
      this.groupSelectedItems.forEach(group => {
          this.addGroupSectionsAndBreeds(group.groupId);
        }
      );
    } else {
      this.isProcessing = false;
    }
  }

  onBreedSelectorChanged() {
    this.isProcessing = true;
    this.breedSelectedItems = [];
    this.isProcessing = false;
  }

  // Group selector methods
  onGroupSelect(item) {
    this.isProcessing = true;
    this.addGroupSectionsAndBreeds(item.groupId);
  }

  onGroupDeselect(item) {
    this.isProcessing = true;
    this.sectionDropdownList.forEach(section => {
      if (section.groupNumber === item.groupId) {
        this.removeSectionBreeds(section.sectionId);
      }
    });
    this.sectionDropdownList = this.sectionDropdownList.filter(section => section.groupNumber !== item.groupId);
    this.sectionSelectedItems = [];
    this.isProcessing = false;
  }

  // Section selector methods

  onSectionSelect(item) {
    this.isProcessing = true;
    this.sectionSelectorHelper.push(item);
    this.addSectionBreeds(item.sectionId);
  }

  onSectionDeselect(item) {
    this.isProcessing = true;
    this.removeSectionBreeds(item.sectionId);
    this.isProcessing = false;
  }

  // Selectors helper methods
  addGroupSectionsAndBreeds(groupId: number) {
    this.dogService.getSectionsInGroup(groupId).subscribe(
      data => {
        this.sectionDropdownList = this.sectionDropdownList.concat(data);
        this.sectionSelectorHelper = this.sectionSelectorHelper.concat(data);
        data.forEach(newSection => this.addSectionBreeds(newSection.sectionId));
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

  addSectionBreeds(sectionId: number) {
    this.dogService.getBreedsInSection(sectionId).subscribe(
      data => {
        this.breedDropdownList = this.breedDropdownList.concat(data);
        this.sectionSelectorHelper = this.sectionSelectorHelper.filter(section => section.sectionId !== sectionId);
        if (this.sectionSelectorHelper.length === 0) {
          this.isProcessing = false;
        }
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

  removeSectionBreeds(sectionId: number) {
    this.breedDropdownList = this.breedDropdownList.filter(breed => breed.sectionId !== sectionId);
    this.breedSelectedItems = [];
  }

  // Form completion methods
  onSubmit() {
    this.isSubmitted = true;
    if (this.createForm.invalid) {
      return;
    }

    const newContest: ContestType = {
      contestTypeId: 0,
      name: this.f.name.value,
      isEnterable: this.f.isEnterable.value,
      breedIds: this.getBreedIds()
    };

    this.isProcessing = true;
    this.contestService.addContest(newContest)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/contest/list']).then(() => {
            this.messageService.removeMessages();
            this.messageService.addSuccess('Utworzono konkurs: ' + newContest.name);
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
    console.log(newContest);
  }

  getBreedIds(): number[] {
    const ids = [];
    if (this.breedSelected) {
      this.breedSelectedItems.forEach(breed => {
        ids.push(breed.breedId);
      });
    } else {
      this.breedDropdownList.forEach(breed => {
        ids.push(breed.breedId);
      });
    }
    return ids;
  }


}
