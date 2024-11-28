import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginResponse, Login } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SessionService } from 'src/app/shared/services/session-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  public showPassword = false;
  disabled = '';
  active: any;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private sessionService: SessionService
  ) {
     const bodyElement = this.renderer.selectRootElement('body', true);
     this.renderer.setAttribute(bodyElement, 'class', 'cover1 justify-center');
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  // firebase
  identifier = '';
  password = '';
  errorMessage = ''; // validation _error handle
  _error: { name: string; message: string } = { name: '', message: '' }; // for firbase _error handle

  clearErrorMessage() {
    this.errorMessage = '';
    this._error = { name: '', message: '' };
  }

  login() {
    this.clearErrorMessage()
    if (this.validateForm(this.identifier, this.password)) {
      this.authservice
        .login(new Login(this.identifier, this.password) ).subscribe({
          next: (res: ILoginResponse) => {
            this.router.navigate(['/dashboard/sales']);
            this.sessionService.localLogin(res.user, res.token);
          },
          error: () => {},
          complete: () => {}
        })
    }
  }

  validateForm(identifier: string, password: string) {
    if (identifier.length === 0) {
      this.errorMessage = 'please enter identifier id';
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = 'please enter password';
      return false;
    }

    if (password.length < 6) {
      this.errorMessage = 'password should be at least 6 char';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  //angular
  public loginForm!: FormGroup;
  public error: any = '';

  get form() {
    return this.loginForm.controls;
  }

  

  public togglePassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    const bodyElement = this.renderer.selectRootElement('body', true);
    this.renderer.removeAttribute(bodyElement, 'class');
  }
}
