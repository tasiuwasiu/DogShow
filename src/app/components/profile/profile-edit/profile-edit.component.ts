import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../services/Authorization/authorization.service';
import {MessageService} from '../../../services/Message/message.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/User.model';
import {UserService} from '../../../services/User/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  editForm: FormGroup;
  isProcessing = true;
  isSubmitted = false;
  user: User;

  constructor(private formBuilder: FormBuilder,
              private authorizationService: AuthorizationService,
              private messageService: MessageService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.authorizationService.getCurrentUser();
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required]
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
    this.userService.editUser(this.authorizationService.getCurrentUserID(), this.user)
      .pipe(first())
      .subscribe(
        data => {
          this.messageService.removeMessages();
          this.messageService.addSuccess('Edytowano!');
          this.isProcessing = false;
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
