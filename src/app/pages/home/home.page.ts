import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  constructor() {}

  map!: L.Map;
  marker!: L.Marker;

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap() {
    //API do navegador
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Inicializando mapa
          this.map = L.map('map').setView([lat, lon], 15);

          // Adicionando layer openStreetMap
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              'Map data ₢ <a href= "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(this.map);

          // Marcador com a posição atual
          this.marker = L.marker([lat, lon])
            .addTo(this.map)
            .bindPopup('Você está aqui!')
            .openPopup();
        },
        (error) => {
          console.error('Erro ao pegar a localização:', error);
        }
      );
    } else {
      console.error('Geolocation não é suportado por esse navegador.');
    }
  }
}
