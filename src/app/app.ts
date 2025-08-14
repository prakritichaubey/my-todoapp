import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('my-todoapp');
  readonly APIUrl = "http://localhost:5038/api/todoapp/";

  constructor(private http: HttpClient) { }
  notes: any[] = [];

  refreshNotes() {
    // Corrected line: Add <any[]> to specify the expected return type
    this.http.get<any[]>(this.APIUrl + 'GetNotes').subscribe(data => {
      this.notes = data;
    })
  }

  ngOnInit() {
    this.refreshNotes();
  }

addNotes(){
  var newNotes=(<HTMLInputElement>document.getElementById("newNotes")).value;
  var formData=new FormData();
  formData.append("newNotes",newNotes);
  this.http.post(this.APIUrl+'AddNotes',formData).subscribe(data=>{
    alert(data);
    this.refreshNotes();
  })
}

deleteNotes(id:any){
  
  this.http.delete(this.APIUrl+'DeleteNotes?id='+id).subscribe(data=>{
    alert(data);
    this.refreshNotes();
  })
}
}