import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthorizationService} from '../../../services/Authorization/authorization.service';
import {first} from 'rxjs/operators';
import {MessageService} from '../../../services/Message/message.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private titleService: Title,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authorizationService: AuthorizationService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Logowanie');
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authorizationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authorizationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]).then(() => {
              this.messageService.removeMessages();
              this.messageService.addSuccess('Zalogowano!');
            });
        },
        error => {
          if (error.error.message) {
            this.messageService.addError(error.error.message);
          } else if (error.status !== null && error.status === 0) {
            this.messageService.addError('Brak połączenia z serwerem API!');
          } else {
            this.messageService.addError('Błąd logowania');
          }
          this.loading = false;
        }
      );
  }

}
