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
  formatarValor(valor: number) {
    return valor % 1 === 0 ? valor : valor.toFixed(1);
  }
  @Input() placesEdit!: Place;

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
    if (this.placesEdit) {
      // Edição place
      this.place = { ...this.placesEdit };
    } else {
      // Novo place
      this.place.id = Date.now().toString();
      const hoje = new Date();
      const dia = hoje.getDate().toString().padStart(2, '0');
      const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
      const ano = hoje.getFullYear();
      this.place.data = `${dia}/${mes}/${ano}`;

    const hoje = new Date();
    const dia = hoje.getDate().toString().padStart(2, '0');
    const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
    const ano = hoje.getFullYear();
    this.place.data = `${dia}/${mes}/${ano}`;
  formatarValorPin(valor: number) {
    return valor % 1 === 0 ? valor : valor.toFixed(1);
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
