import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Place } from 'src/app/models/place.model';
import {
  AlertController,
  MenuController,
  ModalController,
} from '@ionic/angular';
import { AddPlaceModalComponent } from 'src/app/components/add-place-modal/add-place-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.page.html',
  styleUrls: ['./places-list.page.scss'],
  standalone: false,
})
export class PlacesListPage implements OnInit {
  categorias = [
    { nome: 'Restaurante', valor: 'restaurante' },
    { nome: 'Lanchonete', valor: 'lanchonete' },
    { nome: 'Oriental', valor: 'oriental' },
    { nome: 'Pizzaria', valor: 'pizzaria' },
    { nome: 'Cafeteria', valor: 'cafeteria' },
    { nome: 'Bar', valor: 'bar' },
    { nome: 'Sorveteria', valor: 'sorveteria' },
    { nome: 'Padaria', valor: 'padaria' },
    { nome: 'Outro', valor: 'outro' },
  ];

  lugares: Place[] = [];
  lugaresFiltrados: Place[] = [];

  // Filtros inseridos pelo usuário
  categoriasFiltro: string[] = [];
  notaMinima: number = 0;

  constructor(
    private storageService: StorageService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private menu: MenuController
  ) {}

  async ngOnInit() {
    await this.carregarLugares();
  }

  formatarValor(valor: number) {
    return valor % 1 === 0 ? valor : valor.toFixed(1);
  }

  async voltarHome() {
    await this.menu.close();
    this.router.navigateByUrl('/');
  }

  async carregarLugares() {
    this.lugares = await this.storageService.getPlaces();
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.lugaresFiltrados = this.lugares.filter((place) => {
      const categoriaValida =
        this.categoriasFiltro.length === 0 ||
        this.categoriasFiltro.includes(place.categoria);
      const notaValida = place.nota >= this.notaMinima;
      return categoriaValida && notaValida;
    });
  }

  async editarPlace(place: Place) {
    const modal = await this.modalCtrl.create({
      component: AddPlaceModalComponent,
      componentProps: {
        placesEdit: place,
      },
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role == 'confirm' && data) {
      await this.storageService.updatePlace(data);
      await this.carregarLugares();
    }
  }

  async excluirPlace(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Excluir local',
      message: 'Tem certeza que deseja excluir este lugar?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: async () => {
            await this.storageService.removePlace(id);
            await this.carregarLugares();
          },
        },
      ],
    });
    await alert.present();
  }
}
