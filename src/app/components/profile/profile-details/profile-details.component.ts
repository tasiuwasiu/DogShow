import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../services/Authorization/authorization.service';
import {User} from '../../../models/User.model';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  user: User;

  constructor(private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.user = this.authorizationService.getCurrentUser();
  }

}
