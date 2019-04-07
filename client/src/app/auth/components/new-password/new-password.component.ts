import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html'
})
export class NewPasswordComponent implements OnInit {

  newPswForm: FormGroup;
  token: string;
  id: string;

  err: string;
  msg: string;

  showForm = true;

  constructor(private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getToken();
    this.newPswForm = this.formBuilder.group({
      psw: ['', [Validators.required, Validators.minLength(7)]],
      psw2: ['', [Validators.required, Validators.minLength(7)]]
    }, {validator: this.passwordMatchValidator});
  }

  savePsw() {
    if (this.token && this.newPswForm.valid && this.newPswForm.get('psw')) {
      this.authenticationService.changePsw({
        psw: this.newPswForm.get('psw').value,
        id: this.id,
        token: this.token}).then(
        userName => {
          this.err = '';
          this.msg = 'Nowe hasło zostało zapisane. Możesz się zalogować.';
          this.showForm = false;
        },
        err => {
          this.err = err.status === 422 ? 'Link jest niepoprawny lub wygasł.' : 'Błąd zmiany hasła';
      });
    }
  }

  private getToken() {
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'] ? params['token'] : null;
      this.id = params['id'] ? params['id'] : null;
    }).unsubscribe();
  }

  private passwordMatchValidator(frm: FormGroup) {
    return frm.get('psw').value === frm.get('psw2').value ? null : {'mismatch': true};
  }
}
