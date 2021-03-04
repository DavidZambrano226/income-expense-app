import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { isLoading, stopLoading } from '../../share/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState> ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)] ]
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => this.isLoading = ui.isLoading );
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  login() {

    this.store.dispatch( isLoading() );

    const { email, password } = this.loginForm.value;
    // this.loading();
    this.authService.singIn( email, password).then(
      (resp) => {
        // Swal.close();
        this.store.dispatch( stopLoading() );
        this.router.navigate(['/']);
      })
    .catch((err) => {
      this.store.dispatch( stopLoading() );
      Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: err.message
      });
    });
  }

  loading() {
    Swal.fire({
      title: 'Cargando',
      text: 'Estamos validando sus datos..',
      timerProgressBar: true,
      onOpen: () => {
        Swal.showLoading();
      }
    });
  }

}
