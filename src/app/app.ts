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
    });
  }

  ngOnInit() {
    this.refreshNotes();
  }
}