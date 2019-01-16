import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/User/user.service';
import {User} from '../../../models/User.model';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MessageService} from '../../../services/Message/message.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.css']
})
export class ProfileCreateComponent implements OnInit {

  registerForm: FormGroup;
  isProcessing = false;
  isSubmitted = false;

  constructor(private titleService: Title,
              private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Rejestracja');
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required]
    },
      {
        validator: this.checkMatchingPasswords('password', 'repeatPassword')
      });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    const newUser: User = {
      email: this.f.email.value,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      address: this.f.address.value,
      password: this.f.password.value
    };

    this.isProcessing = true;
    this.userService.register(newUser)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']).then(() => {
            this.messageService.removeMessages();
            this.messageService.addSuccess('Zarejestrowano użytkownika!');
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

  private checkMatchingPasswords(password: string, confirmPassword: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[password],
        passwordConfirmationInput = group.controls[confirmPassword];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notSame: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
}
