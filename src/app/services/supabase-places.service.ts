import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root',
})
export class SupabasePlacesService {
  private supabaseUrl =
    'https://zqcorpxykwswmszivusm.supabase.co/rest/v1/places';
  private supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxY29ycHh5a3dzd21zeml2dXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMjM3OTEsImV4cCI6MjA3MjY5OTc5MX0.xFmo4CXuI2ccXprQ_vk44oIEAug1oQLcwRtk7pt3NN0';

  private headers = new HttpHeaders({
    apikey: this.supabaseKey,
    Authorization: `Bearer ${this.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  // Criar novo place
  public addPlace(place: Place): Observable<any> {
    return this.http.post(this.supabaseUrl, place, { headers: this.headers });
  }

  // Listar todos os places
  public getPlaces(): Observable<any> {
    return this.http.get(this.supabaseUrl, { headers: this.headers });
  }

  // Atualizar place por ID
  public updatePlace(updated: Place): Observable<any> {
    return this.http.patch(`${this.supabaseUrl}?id=eq.${updated.id}`, updated, {
      headers: this.headers,
    });
  }

  // Remover place por ID
  public removePlace(id: string): Observable<any> {
    return this.http.delete(`${this.supabaseUrl}?id=eq.${id}`, {
      headers: this.headers,
    });
  }
}
