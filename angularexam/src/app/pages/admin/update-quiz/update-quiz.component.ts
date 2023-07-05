import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,
    private _cat:CategoryService,private _snack:MatSnackBar,private _router:Router) { }
  qId=0;
  quiz: any;
  categories:any=[
    {
      cid: 23,
      title: "Programming",
      description: "This is testing category"
    }   
  ]

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    //alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data)=>{
         this.quiz=data;
         console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      }
    )
    this._cat.categories().subscribe((data:any)=>{
    this.categories=data},(error)=>{
      Swal.fire('error','error in loading categories','error');
    })
  }
  //Update form submit
  public updateData(){
    //Validate if title is null
    if(this.quiz.title.trim()=='' || this.quiz.title.trim()==null){
      this._snack.open("Title required","",{duration: 3000});
      return;
    }
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire('Success','Quiz is updated','success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
        Swal.fire('Error','Quiz is not updated','error').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });    
      }  
    )
  }

}
