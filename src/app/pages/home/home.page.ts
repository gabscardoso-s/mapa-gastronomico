import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import { AddPlaceModalComponent } from 'src/app/components/add-place-modal/add-place-modal.component';
import { StorageService } from 'src/app/services/storage.service';
import { Place } from 'src/app/models/place.model';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  map!: L.Map;
  marker!: L.Marker;
  customMarkers: L.Marker[] = [];

  constructor(
    private modalCtrl: ModalController,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.loadMap();
  }

  async ionViewDidEnter() {
    await this.carregarLocaisSalvos();
  }

  async obterLocalizacao(): Promise<{ lat: number; lon: number }> {
    if (!Capacitor.isNativePlatform()) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      });
    } else {
      const permissao = await Geolocation.requestPermissions();
      if (permissao.location !== 'granted') {
        new Error('Permição de localização negada!');
      }
      const coordinates = await Geolocation.getCurrentPosition();
      return {
        lat: coordinates.coords.latitude,
        lon: coordinates.coords.longitude,
      };
    }
  }

  async loadMap() {
    try {
      const { lat, lon } = await this.obterLocalizacao();

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

      // Carregar locais salvos ao iniciar
      this.carregarLocaisSalvos();

      //! Adicionando um Local
      // Detectando clique no mapa
      this.map.on('click', async (event: L.LeafletMouseEvent) => {
        const latitude = event.latlng.lat;
        const longitude = event.latlng.lng;

        // Criando o modal
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
          const marker = L.marker([data.lat, data.lon], {
            icon: this.getIconByCategoria(data.categoria),
          })
            .addTo(this.map)
            .bindPopup(
              `<strong>${data.nome}</strong><br>${data.categoria}<br>Nota: ${data.nota}`
            )
            .openPopup();

          // Salvando o local no Storage
          await this.storageService.addPlace(data);
          this.customMarkers.push(marker);
          this.carregarLocaisSalvos();
        }
      });
    } catch (erro) {
      console.error('Erro ao pegar a localização:', erro);
    }
  }

  async carregarLocaisSalvos() {
    // Remover marcadores antigos
    this.customMarkers.forEach((marker) => this.map.removeLayer(marker));
    this.customMarkers = [];

    // Adicionar marcadores
    const locais = await this.storageService.getPlaces();

    locais.forEach((place: Place) => {
      const marker = L.marker([place.lat, place.lon], {
        icon: this.getIconByCategoria(place.categoria),
      })
        .addTo(this.map)
        .bindPopup(
          `<strong>${place.nome}</strong><br>${place.categoria}<br>Nota: ${place.nota}`
        );

      this.customMarkers.push(marker);
    });
  }

  getIconByCategoria(categoria: string = '') {
    let file = 'pin.png';

    switch (categoria.toLowerCase()) {
      case 'restaurante':
        file = 'dinner.png';
        break;
      case 'lanchonete':
        file = 'fast-food.png';
        break;
      case 'oriental':
        file = 'sushi.png';
        break;
      case 'pizzaria':
        file = 'pizza.png';
        break;
      case 'cafeteria':
        file = 'coffee-cup.png';
        break;
      case 'bar':
        file = 'beer.png';
        break;
      case 'sorveteria':
        file = 'ice-cream.png';
        break;
      case 'padaria':
        file = 'bread.png';
        break;
      case 'outro':
        file = 'pin.png';
        break;
    }

    return L.icon({
      iconUrl: `assets/icon/${file}`,
      iconSize: [48, 48],
      popupAnchor: [0, -32],
    });
  }
}
