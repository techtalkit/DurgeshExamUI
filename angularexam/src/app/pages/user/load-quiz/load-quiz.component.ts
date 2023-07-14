import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:number|undefined;
  quizzes:any|undefined;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {
    //Here the variable in bracket coming from routing file and left is variable of this ts file
    this.catId=this._route.snapshot.params['catId'];
    if(this.catId==0){
      this._quiz.quizzes().subscribe(
        (data)=>{
            this.quizzes=data;
            console.log(this.quizzes);
        },
        (error)=>{
            console.log(error);
            alert("error in loading all quizzes")
        }
      )
    }else{
      console.log("Load the specific quizzes");
    }
  }

}
