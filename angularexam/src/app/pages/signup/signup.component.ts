import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private snack: MatSnackBar) { }
  public user={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
  }

  ngOnInit(): void {
  }
  formSubmit(){
    console.log(this.user);
    if(this.user.username=='' || this.user.username==null){
      //alert('User is required');
      // this.snack.open('Username is required','',{
      //   duration:3000,
      //   verticalPosition:'top',
      // });
      Swal.fire('Username is required!!!','Username should not be empty','warning');
      return;
    }
    //adduser: userservice
    this.userService.adduser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        // this.snack.open('Successfully registered','',{
        //   duration:3000,
        //   verticalPosition:'top',
        // });
        Swal.fire('Successfully done!!!!','User id is'+data.id,'success');
      },
      (error)=>{
        //error
        console.log(error);
        //alert("something went wrong")
        // this.snack.open('Something went wrong','',{
        //   duration:3000,
        //   verticalPosition:'top',
        // });
        Swal.fire('Error','Something went wrong','error');
      }
    )
  }
}
