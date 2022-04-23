import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(
    private _accountService: AccountService,
    private _toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this._accountService.register(this.model).subscribe( response => {
      console.log(response);
      this.cancel();
    }, error => {
      this._toastr.error(error.error);
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
