import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cour } from 'src/app/cour';
import { CourService } from 'src/app/cour.service';
import { saveAs } from 'file-saver';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-student-layouts',
  templateUrl: './student-layouts.component.html',
  styleUrls: ['./student-layouts.component.scss']
})
export class StudentLayoutsComponent implements OnInit {
  courses: Cour[] = [];
  fileUrl;

  constructor(private courService : CourService,private router: Router,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getCour();
  }

  private getCour(){
    this.courService.getAllCourses().subscribe(data =>{
      this.courses = data;
    })
  }

  download(file: any, name: any) {
    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(file);
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  downloadCour(courFile: any) {
      this.courService.download(courFile).subscribe(value => {
          this.download(value, courFile);
      });
  }



}
