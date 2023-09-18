import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendorAgreementDto } from '../Model/vendorAgreementDto.model';

@Injectable({
  providedIn: 'root',
})
export class AgreementService {
  baseUrl = 'https://localhost:7128/api/Agreement/';
  constructor(private http: HttpClient) {}
  create(model: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + 'create-agreement',
      model
    );
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl + 'get-list');
  }
}
