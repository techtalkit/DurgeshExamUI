import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logindata={
    username:'',
    password:''
  }
  constructor(private snack: MatSnackBar,private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit(){
    console.log("Login button is clicked");
    if(this.logindata.username.trim()=='' || this.logindata.username==null){
        this.snack.open('Username is required','',{
          duration:3000,
        });
        return;
    }
    if(this.logindata.password.trim()=='' || this.logindata.password==null){
      this.snack.open('Password is required','',{
        duration:3000,
      });
      return;
  }
  //Request to server to generate the token
   this.login.generateToken(this.logindata).subscribe(
     (data:any)=>{
       console.log('success');
       console.log(data);
       //login after token generate, save token in localstorage,userdetail is localstorage
       this.login.loginUser(data.token);
       this.login.getCurrentUser().subscribe((user:any)=>{
         this.login.setUser(user);
         console.log(user);
         //redirect ...ADMIN:admin-dashboard
         if(this.login.getUserRole()=='Admin'){
           //admin-dashboard
          // window.location.href='/admin';
          this.router.navigate(['admin']);
          this.login.loginStatusSubject.next(true);
         }else if(this.login.getUserRole()=='Normal') {
           //normal-dashboard
           //window.location.href='/user';
           this.router.navigate(['user']);
           this.login.loginStatusSubject.next(true);
         }else{
           this.login.logout();
         }
       })
     },(error)=>{
      console.log('error');
      console.log(error);
      this.snack.open("Invalid details",'',{
        duration: 3000,
      });
     }
   )
  }
}
