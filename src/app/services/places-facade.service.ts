import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { SupabasePlacesService } from './supabase-places.service';
import { Place } from '../models/place.model';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesFacadeService {
  private online = false;

  constructor(
    private storageService: StorageService,
    private supabaseService: SupabasePlacesService
  ) {
    this.checkOnline();
  }

  private checkOnline() {
    this.online = navigator.onLine;
    window.addEventListener('online', () => (this.online = true));
    window.addEventListener('offline', () => (this.online = false));
  }

  addPlace(place: Place): Observable<any> {
    if (this.online) {
      return this.supabaseService.addPlace(place);
    } else {
      return from(this.storageService.addPlace(place));
    }
  }

  getPlaces(): Observable<Place[]> {
    if (this.online) {
      return this.supabaseService.getPlaces();
    } else {
      return from(this.storageService.getPlaces());
    }
  }

  updatePlace(updated: Place): Observable<any> {
    if (this.online) {
      return this.supabaseService.updatePlace(updated);
    } else {
      return from(this.storageService.updatePlace(updated));
    }
  }

  removePlace(id: string): Observable<any> {
    if (this.online) {
      return this.supabaseService.removePlace(id);
    } else {
      return from(this.storageService.removePlace(id));
    }
  }
}
