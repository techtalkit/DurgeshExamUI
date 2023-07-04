import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes=[
    {
      qId:23,
      title:'Basic Java Quiz',
      description:'This quiz is for java',
      maxMarks:50,
      numberOfQuestions:'20',
      active: '',
      category:{
        title: "Java Quiz"
      }
    },
  
  ]
  constructor(private quiz:QuizService) { }

  ngOnInit(): void {
    this.quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error!!!","Error in loading data","error")
      }
    )
  }
  //Delete Quiz function
  deleteQuiz(qId: number){
     Swal.fire({
      icon: 'info',
      title:"Are you sure to delete this quiz",
      confirmButtonText:"Delete",
      showCancelButton: true
     }).then((result)=>{
      if(result.isConfirmed){
        //Delete Quiz Code
        this.quiz.deleteQuiz(qId).subscribe(
          (data)=>{
             this.quizzes=this.quizzes.filter((quiz)=>quiz.qId!=qId)
             Swal.fire('Success','Quiz deleted successfully','success');
          },
          (error)=>{
            console.log(error);
            Swal.fire('Error!!!','Error in deleting quiz','error');
          }
    
         )
      }
     })
  }

}
