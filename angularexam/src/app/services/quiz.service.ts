import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }
  public quizzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }
  //add new quiz
  public addQuiz(quiz:any){
    return this._http.post(`${baseUrl}/quiz/`,quiz);
  }
  //Delete quiz
  public deleteQuiz(qId:number){
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }
  //Get the single quiz
  public getQuiz(qId: number){
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }
  //update the quiz
  public updateQuiz(quiz:any){
    return this._http.put(`${baseUrl}/quiz/`,quiz);
  }

}
