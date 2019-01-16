import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../services/Authorization/authorization.service';
import {User} from '../../../models/User.model';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  user: User;

  constructor(private titleService: Title,
              private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Szczegóły profilu');
    this.user = this.authorizationService.getCurrentUser();
  }

}
