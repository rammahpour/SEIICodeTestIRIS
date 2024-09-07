import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISubdivision } from './subdivision-model';

@Injectable({
  providedIn: 'root'
})
export class SubdivisionService {

  private apiUrl = 'http://localhost:3000/v1/subdivisions'; // Replace with your API endpoint or JSON file path

  constructor(private http: HttpClient) {}

  getSubdivisions(): Observable<ISubdivision> {
    return this.http.get<ISubdivision>(this.apiUrl);
  }
}
