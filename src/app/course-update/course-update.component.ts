import { Component, OnInit } from '@angular/core';
import { Cour } from '../cour'; 
import { ActivatedRoute } from '@angular/router';
import { CourService } from '../cour.service'; 
import { Router } from '@angular/router'
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.scss']
})
export class CourseUpdateComponent implements OnInit {
  cour: Cour = new Cour() ;
  idCours : number;
  selectedFile: File | null = null;
  nomCour:any;
  detailsCour:any;
  courfileType: string;

  // canSubmit: boolean = false;


  constructor(private fireStorage: AngularFireStorage, private route: ActivatedRoute,private router: Router,private courService: CourService) { }

  ngOnInit(): void {
    this.idCours = this.route.snapshot.params['idCours']
    this.courService.getCourById(this.idCours).subscribe(data => {
      console.log(data);
      this.cour = data;
      // Extract the file name from the courfile URL
    const fileName = data.courfile || '';
    const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';

    // Set the courfileType property based on the file extension
    if (fileExtension.includes('pdf')) {
      this.courfileType = 'pdf';
    } else if (fileExtension.includes('jpg') || fileExtension.includes('jpeg') || fileExtension.includes('png') || fileExtension.includes('gif')) {
      this.courfileType = 'image';
    } else if (fileExtension.includes('docx') || fileExtension.includes('doc')) {
      this.courfileType = 'word';
    } else {
      this.courfileType = 'unknown';
    }
   })
   
  }

  get canSubmit(): boolean {
    return !!this.cour.nomCour && !!this.cour.detailsCour && !!this.cour.courfile;
  }

  async onFileChange(event: any): Promise<void> {
    const file = event.target.files[0];
    this.courfileType = "unknow";
    console.log(file);
    
    if (file) {
      this.cour.courfile = ""
      if (file.type.startsWith('image/')) {
        this.courfileType = 'image';
      } else if (file.type.startsWith('application/pdf')) {
        this.courfileType = 'pdf';
      } else if (file.type.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        this.courfileType = 'word';
      } else {
        this.courfileType = 'unknown';
      }
      const path = `test/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.cour.courfile = url;
      console.log('File URL:', this.cour.courfile);
      console.log('File typeee :', this.courfileType);
      // await this.onSubmit()
    }
  }

  updatecour() {
    // console.log("nour ",this.cour.idCours);
    // console.log("nour test ",this.cour);
    this.courService.updateCours( this.cour , this.cour.idCours ).subscribe(data => {
        // console.log('cour updated :', data);

        this.goToCourList();
      },
      (error) => {
        console.log(error);

      }
    );
  }

  onSubmit(){
    if (!this.cour.courfile) {
      console.warn('No file selected for upload.');
      // Handle the case where no file is selected (optional)
    } else {
      this.updatecour();
    }
   } 
    onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      console.log('Selected file name:', this.selectedFile.size);
      this.cour.courfile=this.selectedFile.name;
    }
   }

  goToCourList(){
    this.router.navigate(['/courlist'])
  }

}
