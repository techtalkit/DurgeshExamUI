import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})

export class AddQuizComponent implements OnInit {

  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService) { }
  categories=[
    {
      cid:23,
      title:'Programming'
    }
  ]
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category: {
      cid:''
    }
  }

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
          //load categories
          this.categories=data;
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!!','error in loading data from server','error');
      }
    )
  }
//add quiz function
addQuiz(){
  if(this.quizData.title.trim()=='' || this.quizData.title.trim()==null){
          this._snack.open("Title required","",{duration: 3000});
          return;
  }
  //validations...
  //call the server
  this._quiz.addQuiz(this.quizData).subscribe(
    (data)=>{
       Swal.fire('Success','Quiz is added','success');
       this.quizData={
        title:'',
        description:'',
        maxMarks:'',
        numberOfQuestions:'',
        active:true,
        category: {
          cid:''
        }
      }
    },
    (error)=>{
      Swal.fire('Error!!','Error while adding quiz','error');
      console.log(error);
    }
  )
}
}
