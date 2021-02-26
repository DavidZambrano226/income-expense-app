import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor( 
          private fb: FormBuilder, 
          private authService: AuthService,
          private router: Router,
          ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['test', Validators.required],
      mail: ['test@test.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  createUser() {

    if (this.registerForm.invalid) { return; }

    this.loading();
    
    const { name, mail, password } = this.registerForm.value;
    
    this.authService.createUser( name, mail, password )
          .then( credentials => {
            console.log(credentials);
            Swal.close();
            this.router.navigate(['/']);
          })
          .catch(err => {
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
