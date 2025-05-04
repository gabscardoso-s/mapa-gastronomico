export interface Place {
  id: string;
  nome: string;
  categoria: string;
  nota: number;
  observacoes?: string;
  data?: string;
  lat: number;
  lon: number;
}
