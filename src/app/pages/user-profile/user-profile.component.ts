import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage"

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // constructor() { }
  constructor(private fireStorage:AngularFireStorage){}

  ngOnInit() {
  }

  async onFileChange(event:any){
    const file = event.target.files[0]
    if(file){
      const path = `test/${file.name}`
      const uploadTask =await this.fireStorage.upload(path,file)
      const url = await uploadTask.ref.getDownloadURL()
      console.log(url)
    }
  }

}
