import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BasicoService {
  constructor(private http: HttpClient) {}

  getData(url: string): Observable<any[]> {
    return this.http.get<any[]>(url);
  }

  postData(data: any, url: string): Observable<any> {
    return this.http.post<any>(url, data);
  }

  deleteData(id: string, url: string): Observable<any> {
    return this.http.delete<any>(`${url}/${id}`);
  }

  updateData(id: string, data: any, url: string): Observable<any> {
    console.log('data:', data);
    return this.http.put<any>(`${url}/${id}`, data);
  }

  createData(data: any, url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.postData(data, url).subscribe(
        (response: any) => {
          resolve(response.message);
        },
        (error: any) => {
          console.error('Error al enviar los datos:', error);
          reject(error);
        }
      );
    });
  }

  deleteDataByID(id: string, url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.deleteData(id, url).subscribe(
        (response: any) => {
          resolve(response.message);
        },
        (error: any) => {
          console.error('Error al eliminar los datos:', error);
          reject(error);
        }
      );
    });
  }
}
