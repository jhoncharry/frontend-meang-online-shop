import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/@core/models/user.model';
import { AuthService } from 'src/app/@core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private user: User;
  userLabel: string;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.user;
  }

  ngOnInit(): void {
    this.userLabel = `${this.user.name} ${this.user.lastname}`;
  }

  logout() {
    this.auth.logout().subscribe(
      ({ data: { logout }, loading, errors }) => {
        if (logout) {
          Swal.fire('Logout', 'Successful Logout', 'success');
          this.router.navigateByUrl('/login');
          return;
        } else if (errors) {
          Swal.fire('Logout', 'Something went wrong...', 'error');
          this.router.navigateByUrl('/login');
        }
      },
      (error) => {
        Swal.fire('Error', 'Something went wrong... Networking!', 'error');
      }
    );
  }
}
