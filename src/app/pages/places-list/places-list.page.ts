import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Place } from 'src/app/models/place.model';
import { AlertController, ModalController } from '@ionic/angular';
import { AddPlaceModalComponent } from 'src/app/components/add-place-modal/add-place-modal.component';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.page.html',
  styleUrls: ['./places-list.page.scss'],
  standalone: false,
})
export class PlacesListPage implements OnInit {
  lugares: Place[] = [];
  lugaresFiltrados: Place[] = [];

  // Filtros inseridos pelo usuário
  categoriaFiltro: string = '';
  notaMinima: number = 0;

  constructor(
    private storageService: StorageService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.carregarLugares();
  }

  async carregarLugares() {
    this.lugares = await this.storageService.getPlaces();
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.lugaresFiltrados = this.lugares.filter((place) => {
      const categoriaValida =
        !this.categoriaFiltro ||
        place.categoria
          .toLowerCase()
          .includes(this.categoriaFiltro.toLowerCase());
      const notaValida = place.nota >= this.notaMinima;
      return categoriaValida && notaValida;
    });
  }

  async editarPlace(place: Place) {
    const modal = await this.modalCtrl.create({
      component: AddPlaceModalComponent,
      componentProps: {
        place,
      },
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role == 'confirm' && data) {
      await this.storageService.updatePlace(data);
      this.carregarLugares();
    }
  }

  async excluirPlace(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este lugar?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: async () => {
            await this.storageService.removePlace(id);
            this.carregarLugares;
          },
        },
      ],
    });
    await alert.present();
  }
}
