import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/models/place.model';

@Component({
  selector: 'app-add-place-modal',
  templateUrl: './add-place-modal.component.html',
  styleUrls: ['./add-place-modal.component.scss'],
  standalone: false,
})
export class AddPlaceModalComponent implements OnInit {
  @Input() latitude!: number;
  @Input() longitude!: number;

  place: Place = {
    id: '',
    nome: '',
    categoria: '',
    nota: 0,
    observacoes: '',
    data: '',
    lat: 0,
    lon: 0,
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.place.id = Date.now().toString();
    this.place.data = new Date().toISOString();
  }

  salvar() {
    this.place.lat = this.latitude;
    this.place.lon = this.longitude;
    this.modalCtrl.dismiss(this.place, 'confirm');
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'calcel');
  }
}
