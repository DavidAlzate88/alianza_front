import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClientData} from "../components/clients/list/clients.component";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl = 'http://localhost:8080/api/clients'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  getClients(): Observable<ClientData[]> {
    return this.http.get<ClientData[]>(this.apiUrl);
  }

  getClientById(key: string): Observable<ClientData[]> {
    return this.http.get<ClientData[]>(`${this.apiUrl}/${key}`);
  }

  saveClients(client:ClientData): Observable<ClientData> {
    return this.http.post<ClientData>(`${this.apiUrl}`, client);
  }
}
