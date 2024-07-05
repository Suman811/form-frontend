import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormServiceService } from '../form-service.service';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { from, Observable} from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  arr: any[] = [];


  constructor(private serve: FormServiceService,) {

  }



  loginForm = new FormGroup({
    Student_Name: new FormControl("", Validators.required),
    Student_Address: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    course: new FormControl("", Validators.required),
    dob: new FormControl("", Validators.required),
  })
  saveForm() {

    if (this.loginForm.valid) {
      this.serve.addStudent(this.loginForm.value).subscribe((data) => {
        if (data) {
          console.log('Data is submited successfully');

        }
      })
    }
    else { console.log("not valid"); }
  }

  posts:any[]=[];
  searchTerm: string = '';
  filteredPosts: any[] = [];
  applyFilter(event:any) {
    const value=event.target.value;
    this.filteredPosts = this.arr.filter((post) => post.student_Name.toLowerCase().includes(value.toLowerCase()));
  }




  ngOnInit(): void {
    this.info_list();
  }

  info_list() {
    this.serve.getStudentList().subscribe((data) => {
      console.log(data);
      this.arr = data
      this.filteredPosts=data;
    });
  }


  del(Id: any) {
    this.serve.deleteStudent(Id).subscribe((data) => {
      this.info_list();
    })
  }

  
  counter = interval(1000);
  subscription = this.counter.subscribe(n =>
    console.log(`It's been ${n + 1} seconds since subscribing!`));

    data = from(fetch('https://localhost:7091/api/Values/GetStudent')).subscribe({
      next(response) { console.log(response); },
      error(err) { console.error('Error: ' + err); },
      complete() { console.log('Completed'); }
    });
    
}







