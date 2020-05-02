export class ChickenLineage {
  id: number;
  lineage: string;
  provider: string;
  chickenColor: string;
}

export class Shed {
  id: number;
  name: string;
  type: string;
  capacity: number;
  model: string;
  shedManufacturer = new ShedManufacturer();
}

export class ShedManufacturer {
  id: number;
  manufacturer: string;
}

export class ChickenLot {
  id: number;
  birthDate: Date;
  accommodationDate: Date;
  initialQuantity: number;
  currentQuantity: number;
  debicking: string;
  chickenLineage = new ChickenLineage();
  shed =  new Shed();

}

export class CreationMonitoring {
  id: number;
  ageWeek: number;
  ageDay: number;
  dateWeek: Date;
  bodyWeight: number;
  food: number;
  water: number;
  discard: number;
  mortality: number;
  chickenLot = new ChickenLot();

}
