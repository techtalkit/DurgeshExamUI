import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid:number|undefined;
  questions:any|undefined;
  marksGot:number=0;
  correctAnswers:number=0;
  attempted:number=0;
  isSubmit:boolean=false;
  constructor(private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }
  loadQuestions(){
    this._question.getQuestionsOfQuizOfTest(this.qid).subscribe(
      (data:any)=>{
        this.questions=data;
        this.questions.forEach((q:any)=>{
          q['givenAnswer']='';
        })
        console.log(this.questions);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in loading questions","error");
      }
    )
  }
  //This functions helps to prevent to go back
  preventBackButton(){
       history.pushState(null,location.href);
       this.locationSt.onPopState(()=>{
        history.pushState(null,location.href);
       })
  }
  submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: `Don't save`,
      icon:'info'
    }).then((e)=>{
      if(e.isConfirmed){
        //calculation
        this.isSubmit=true;
        this.questions.forEach((q:any)=>{
          if(q.givenAnswer==q.answer){
            this.correctAnswers++;
            let marksSingleQuestion=this.questions[0].quiz.maxMarks/this.questions.length;
            this.marksGot+=marksSingleQuestion;
          }
          if(q.givenAnswer.trim()!=''){
              this.attempted++;
          }
        });
        console.log("Correct Answers: "+this.correctAnswers);
        console.log("Marks Got: "+this.marksGot);
        console.log("attempted questions "+this.attempted);
      }
    })
  }

}
