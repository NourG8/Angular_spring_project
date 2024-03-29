import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {CourService } from '../cour.service';
import { Cour } from '../cour';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  cour : Cour[];
  searchText = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalCourses: number = 0;
  

  constructor(private fireStorage: AngularFireStorage, private courService : CourService,private router: Router) { }

  ngOnInit(): void {
    this.getCour();
  }

  private getCour(): void {
    this.courService.getAllCourses().subscribe(data => {
      this.cour = data;
      this.totalCourses = data ? data.length : 0;
    });
  }

  // @Output() courseDeleted = new EventEmitter<void>();
  // courseDeleted = new EventEmitter<void>(); // Initialize the event emitter

  deleteCourse(idCours: number) {
    this.courService.deleteCourse(idCours).subscribe(data => {
      console.log(data)
      this.getCour();
    });
  }

  updateCour(idCours: number){
    this.router.navigate(['courupdate',idCours])
  }

  downloadFile(path: string): void {
    this.fireStorage.storage.refFromURL(path).getDownloadURL().then((url) => {
      window.open(url, "_blank");
    }).catch((error) => {
      console.error("Error getting download URL:", error);
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalCourses / this.pageSize);
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      // this.loadCourses();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      // this.loadCourses();
    }
  }
  
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    // this.loadCourses();
  }
  
}
