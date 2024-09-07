import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISubdivisionData } from './subdivision-model';

@Injectable({
  providedIn: 'root'
})
export class SubdivisionService {

  private apiUrl = 'http://localhost:3000/v1/subdivisions';

  constructor(private http: HttpClient) {}

  getSubdivisions(): Observable<ISubdivisionData> {
    return this.http.get<ISubdivisionData>(this.apiUrl);
  }
}
