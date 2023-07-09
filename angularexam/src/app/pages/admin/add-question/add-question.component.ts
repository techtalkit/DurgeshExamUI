import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  qId: number | undefined;
  qTitle: any;
  question:any={
    content: '',
    image: "image.png",
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer:'',
    quiz:{
        
    }
  }
  constructor(
    private _route:ActivatedRoute,
    private _question: QuestionService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    this.question.quiz['qId']=this.qId;
    //this.question.quiz['title']=this.qTitle;
    console.log(this.qId);
    console.log(this.qTitle);
  }
  formSubmit(){
    // alert("testing");
    if(this.question.content.trim()==''|| this.question.content.trim()==null){
      Swal.fire("Error","Question content can't be blank","error");
      return;
    }
    if(this.question.option1.trim()==''|| this.question.option1.trim()==null){
      Swal.fire("Error","Option1 can't be blank","error");
      return;
    }
    if(this.question.option2.trim()==''|| this.question.option2.trim()==null){
      Swal.fire("Error","Option2 can't be blank","error");
      return;
    }
    //submit the form
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
         Swal.fire("Success","Question is saved successfully","success").then((e)=>{
          this._router.navigate(['/admin/view-questions/'+this.qId+'/'+this.qTitle]);
        });;
         this.question={
          content: '',
          image: "image.png",
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer:'',
          quiz:{           
          }
        }
         
      },
      (error)=>{
        Swal.fire("Error","Something went wrong","error");
      }
    )
  }

}
