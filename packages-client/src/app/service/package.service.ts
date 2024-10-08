import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPackages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/packages`);
  }

  getPackage(id: string): Observable<string[]> {
    const encodedId = encodeURIComponent(id);
    return this.http.get<string[]>(`${this.apiUrl}/packages/${encodedId}`);
  }

  getPackageDependencies(id: string): Observable<string[]> {
    const encodedId = encodeURIComponent(id);
    return this.http.get<string[]>(`${this.apiUrl}/packages/${encodedId}/dependencies`);
  }
}
