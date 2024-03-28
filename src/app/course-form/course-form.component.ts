import { Component, OnInit } from '@angular/core';
import { CourService } from '../cour.service';
import { Router } from '@angular/router';
import { Cour } from '../cour';
import { saveAs } from 'file-saver';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  cour: Cour = new Cour();
  courfile: string[] = [];
  selectedFile: File | null = null;
  nomCour: any;
  detailsCour: any;

  constructor(private fireStorage: AngularFireStorage, private router: Router,
     private courService: CourService) { }

  ngOnInit(): void {
  }

  private getCour(): void {
    this.router.navigate(['/courlist'])
  }

  addcour(): void {
    this.cour.addedAt = new Date();
    this.courService.createCourse(this.cour).subscribe(data => {
      console.log('cour added:', data);
      this.getCour();
    },
      (error) => {
        console.log(error);
      }
    );
  }

  async onFileChange(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      const path = `test/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.cour.courfile = url;
      console.log('File URL:', this.cour.courfile);
      // await this.onSubmit()  
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.cour.courfile) {
      console.warn('No file selected for upload.');
      // Handle the case where no file is selected (optional)
    } else {
      this.addcour();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      console.log('Selected file name:', this.selectedFile);
      const path = `test/${this.selectedFile.name}`;
      const uploadTask = this.fireStorage.upload(path, this.selectedFile);
      // this.cour.courfile = uploadTask.ref.fullPath; // Enregistrez le chemin complet de la référence (non nécessaire)
    }
    // const selectedFile = event.target.files[0];
    // this.cour.courfile = selectedFile.name;
    // // Process the selected file here (e.g., display filename, upload to server)
    // console.log('Selected file:', selectedFile);
  }
}