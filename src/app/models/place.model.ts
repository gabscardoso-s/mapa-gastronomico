export interface Place {
  id: string;
  name: string;
  category: string;
  rating: number;
  notes?: string;
  dateAdd: Date;
  location: {
    lat: number;
    lon: number;
  };
}
