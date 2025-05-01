import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import { AddPlaceModalComponent } from 'src/app/components/add-place-modal/add-place-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

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

          // Detectando clique no mapa
          this.map.on('click', async (event: L.LeafletMouseEvent) => {
            const latitude = event.latlng.lat;
            const longitude = event.latlng.lng;

            const modal = await this.modalCtrl.create({
              component: AddPlaceModalComponent,
              componentProps: {
                latitude: latitude,
                longitude: longitude,
              },
            });
            await modal.present();

            const { data, role } = await modal.onWillDismiss();

            if (role == 'confirm' && data) {
              L.marker([data.lat, data.lon])
                .addTo(this.map)
                .bindPopup(
                  `<strong>${data.nome}</strong><br>${data.categoria}<br>Nota: ${data.nota}`
                )
                .openPopup();
            }
          });

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
