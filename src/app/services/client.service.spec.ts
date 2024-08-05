import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ClientData} from "../components/clients/list/clients.component";

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService]
    });
    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve clients', () => {
    const mockClients: ClientData[] = [
      { key: '1', id: 'Client 1', email: 'client1@example.com', phone: '1234567890', date: '2024-01-01' },
      { key: '2', id: 'Client 2', email: 'client2@example.com', phone: '9876543210', date: '2024-02-01' }
    ];

    service.getClients().subscribe(clients => {
      expect(clients.length).toBe(2);
      expect(clients).toEqual(mockClients);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockClients); // Simula la respuesta del backend
  });

  it('should create a client', () => {
    const newClient: ClientData = {
      key: '3',
      id: 'New Client',
      email: 'nuevo@example.com',
      phone: '5555555555',
      date: '2024-03-01'
    };

    service.saveClients(newClient).subscribe(client => {
      expect(client).toEqual(newClient);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newClient);
    req.flush(newClient);
  });
});
