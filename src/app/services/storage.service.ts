import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private PLACES_KEY = 'places';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Métodos genéricos
  public set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  public async get(key: string) {
    return await this._storage?.get(key);
  }

  public remove(key: string) {
    return this._storage?.remove(key);
  }

  public clear() {
    return this._storage?.clear();
  }

  // Métodos específicos para os locais
  public async addPlace(place: Place) {
    const places: Place[] = (await this.get(this.PLACES_KEY)) || [];
    places.push(place);
    await this.set(this.PLACES_KEY, places);
  }

  public async getPlaces() {
    return (await this.get(this.PLACES_KEY)) || [];
  }

  // Métodos atualizar e remover locais com ID
  public async updatePlace(updated: Place) {
    let places: Place[] = (await this.getPlaces()) || [];
    places = places.map((p) => (p.id === updated.id ? updated : p));
    await this.set(this.PLACES_KEY, places);
  }

  public async removePlace(id: string) {
    let places: Place[] = await this.getPlaces();
    places = places.filter((p) => p.id !== id);
    await this.set(this.PLACES_KEY, places);
  }
}
