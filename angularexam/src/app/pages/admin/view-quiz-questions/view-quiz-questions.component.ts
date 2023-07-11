import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: number | undefined;
  qTitle: string |undefined;
  questions: any[]|undefined;

  constructor(private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    console.log(this.qId);
    console.log(this.qTitle);
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
//delete question
deleteQuestion(quesId: number){
  Swal.fire(
    {icon:'info',
    showCancelButton:true,
    confirmButtonText:'Delete',
    title:'Are you sure, you want to delete this question'
  }).then((result)=>{
    if(result.isConfirmed){
      //confirm
      this._question.deleteQuestion(quesId).subscribe(
        (data)=>{
          //Swal.fire("Success","Question is deleted successfully","success")
          this._snack.open('Question deleted','',
          {duration:3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          //Now filter all questions which id doesnt match question id
          this.questions=this.questions?.filter((q)=>q.quesId !=quesId)
        },
        (error)=>{
          console.log(error);
          this._snack.open('Error is deleting question','',
          {duration:3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        }
      )
    }
  })
}

}
