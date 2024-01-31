import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from 'src/app/All-Services/api.service';
declare var $: any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginpage: boolean = true
  forgate: boolean = false
  forgotOTP: boolean = false
  loader:any=false
  constructor(private router: Router, private fb: FormBuilder, private service: ApiService) { }
  loginForm: any = FormGroup
  forgotPasswordForm: any = FormGroup
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  adminEmail = 'admin@mailinator.com'
  adminPassword = '123456'
  get f() { return this.loginForm.controls; }
  get g() { return this.forgotPasswordForm.controls; }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required]],
    });
    // this.forgotPasswordForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    // })
  }
  login() {
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      this.loginForm.get('email').markAsTouched();
      this.loginForm.get('password').markAsTouched();
    } else {
      this.loader = true
      // if (this.loginForm.value.email == this.adminEmail && this.loginForm.value.password == this.adminPassword) {
        this.service.loginUser(this.loginForm.value).subscribe((res: any) => {
          if (res.statusCode == 200  && res.submitUserDetails.id != undefined) {
            this.loader = false
            localStorage.setItem("Admin", JSON.stringify(res.submitUserDetails))
          //   localStorage.setItem("token", JSON.stringify(res.data.authtoken))
          localStorage.setItem("adminId",res.submitUserDetails.id)
          this.router.navigateByUrl("/dashboard")
        } else {
          alert("User Not Authorized")
        }
      })
      // } else {
      //   alert("User Not Authorized")
      // }
    }
  }
  submit() {
    let varEmail = $('#email').val()
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.get('email').markAsTouched();
      // this.toastr.error('Please Fill Require Filed');
    } else {
      this.forgotOTP = true; this.forgate = false
    }
  }
  forgatePasswordButton() {
    this.loginpage = false
    this.forgate = true
  }
  redirect() {
    this.forgate = false; this.loginpage = true
  }
  move = (e: any, p: any, c: any, n: any) => {
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if (length == maxlength) {
      if (n != "") {
        n.focus();
      }
    }
    if (e.key === "Backspace") {
      if (p != "") {
        p.focus();
      }
    }
  }


}
