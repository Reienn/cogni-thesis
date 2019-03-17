import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService, User } from '../../services/authentication.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {

  @Input() user: User;
  @Output() updatedUser = new EventEmitter<User>();
  editUserForm: FormGroup;
  err: string;
  freeze = false;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.editUserForm = this.formBuilder.group({
      mail: [this.user.mail, [Validators.required, Validators.email]],
      educator: [this.user.educator, []],
      psw: ['', [Validators.required, Validators.minLength(7)]],
      psw2: ['', [Validators.required, Validators.minLength(7)]]
    }, {validator: this.passwordMatchValidator});
    this.editUserForm.disable();
    this.editUserForm.get('psw2').enable();
  }

  edit(control: FormControl) {
    control.enable();
  }

  cancel(control: FormControl, initial: string) {
    control.disable();
    control.reset(initial);
  }

  save(control: FormControl, name: string) {
    this.freeze = true;
    this.authenticationService.updateUser({name: this.user.name, update: {[name]: control.value}}).then(
      userName => {
        control.disable();
        this.err = '';
        this.freeze = false;
        if (name !== 'psw') {
          this.user = {...this.user, [name]: control.value};
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          this.updatedUser.emit(this.user);
        }
      },
      err => {
        this.err = 'Nie udało się zapisać danych';
        this.freeze = false;
    });
  }

  private passwordMatchValidator(frm: FormGroup) {
    return frm.get('psw').value === frm.get('psw2').value ? null : {'mismatch': true};
  }
}
