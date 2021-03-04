import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as actionsUi from '../../share/ui.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  uiSubscription: Subscription;
  isLoading = false;

  constructor(
          private fb: FormBuilder,
          private authService: AuthService,
          private router: Router,
          private store: Store<AppState>
          ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['test', Validators.required],
      mail: ['test@test.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.uiSubscription = this.store.select('ui').subscribe( ui => this.isLoading = ui.isLoading );
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  createUser() {

    if (this.registerForm.invalid) { return; }

    // this.loading();
    this.store.dispatch( actionsUi.isLoading() );

    const { name, mail, password } = this.registerForm.value;

    this.authService.createUser( name, mail, password )
          .then( credentials => {
            console.log(credentials);
            // Swal.close();
            this.store.dispatch( actionsUi.stopLoading() );
            this.router.navigate(['/']);
          })
          .catch(err => {
            this.store.dispatch( actionsUi.stopLoading() );
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
