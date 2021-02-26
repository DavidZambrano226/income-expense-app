import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)] ]
    });
  }

  login() {
    console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    this.loading();
    this.authService.singIn( email, password).then(
      (resp) => {
        console.log(resp);
        Swal.close();
        this.router.navigate(['/']);
      })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: err.message
      });
    })
  }

  loading() {
    Swal.fire({
      title: 'Cargando',
      text: 'Estamos validando sus datos..',
      timerProgressBar: true,
      onOpen: () => {
        Swal.showLoading()
      }
    });
  }

}
