import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../config/api.routes';

@Injectable({
  providedIn: 'root',
})
export class BasicoService {
  constructor(private http: HttpClient) {}

  getBasicaData(): Observable<any[]> {
    return this.http.get<any[]>(`${API_ROUTES.BASE_URL}${API_ROUTES.BASICA}`);
  }

  createBasicaData(data: any): Observable<any> {
    return this.http.post<any>(
      `${API_ROUTES.BASE_URL}${API_ROUTES.BASICA}`,
      data
    );
  }
}
