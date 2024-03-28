import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Cour } from './cour';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CourService {
  private apiUrl = 'http://localhost:8088/Corzello/cour';

  constructor(private http: HttpClient,private route :Router) {}

  getAllCourses():Observable<Cour[]> {
    return this.http.get<Cour[]>(`${this.apiUrl}/getAllCours`);
  }
  createCourse(formData : any ) : Observable<any> {
    return this.http.post<Cour>(`${this.apiUrl}/addCour`, formData)
    .pipe(
      catchError(error => {
        if (error.status === 415) {
          console.error('Error: Unsupported Media Type');
          // Handle specific error for unsupported media type
        } else {
          console.error('Error creating course:', error);
        }
        return throwError(error); // Re-throw the error for further handling
      })
    );

      }


  updateCours(formData : any, idCours: number): Observable<any> {
    return this.http.put<Cour>(`${this.apiUrl}/updateCour/${idCours}`, formData)
    .pipe(
      catchError(error => {
        if (error.status === 415) {
          console.error('Error: Unsupported Media Type');
          // Handle specific error for unsupported media type
        } else {
          console.error('Error creating course:', error);
        }
        return throwError(error); // Re-throw the error for further handling
      })
    );
  }

  deleteCourse(idCours: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/deleteCours/${idCours}`);
  }

  getCourById(idCours : number): Observable<Cour>{
    return this.http.get<Cour>(`${this.apiUrl}/getById/${idCours}`);
  }

  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.apiUrl}/file/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  download(filename: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/download/${filename}`,
      { responseType: 'blob' as 'json', headers: { 'Accept': 'application/*' }});
  }
  
  getCountCourses():Observable<Cour[]> {
    return this.http.get<any>(`${this.apiUrl}/countCours`);
  }

  getCountClasses():Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/countClasses`);
  }

  getCountProfs():Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/countProfs`);
  }

  getCountEtudiants():Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/countEtudiants`);
  }

  getCountModules():Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/countModules`);
  }

  getAllModulesWithCours():Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/getAllModules`);
  }

  getAllProfsWithModules():Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/getAllProfs`);
  }

}
