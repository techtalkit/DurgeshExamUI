import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }
  public getQuestionsOfQuiz(qid: number | undefined){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }
  //Get allow questions of Quiz
  public getQuestionsOfQuizOfTest(qid: number | undefined){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }
  //Add question
  public addQuestion(question: any){
    return this._http.post(`${baseUrl}/question/`,question);
  }
  //delete question
  public deleteQuestion(quesId: number){
    console.log(`${baseUrl}/question/${quesId}`);
    return this._http.delete(`${baseUrl}/question/${quesId}`);
  }
  //eval Quiz
  public evalQuiz(questions:any){
    return this._http.post(`${baseUrl}/question/eval-quiz`,questions);
  }
}
