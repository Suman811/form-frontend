import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  readonly apiUrl = 'http://localhost:7091/api/';
  

  constructor(private http: HttpClient) { }
  
  
  getStudentList(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7091/api/Values/GetStudent");
  }

  addStudent(stu: any): Observable<any> {
    console.log(stu);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>('https://localhost:7091/api/Values/AddStudent',stu, httpOptions);
  }

  updateStudent(stu: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'Values/UpdateStudent/', stu, httpOptions);
  }

  deleteStudent(Id: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>('https://localhost:7091/api/Values/DeleteStudent/?Id=' + Id, httpOptions);
  }

  
}