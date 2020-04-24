export class ChickenLineage {
  id: number;
  lineage: string;
  provider: string;
  chickenColor: 'Branca';
}

export class Shed {
  id: number;
  name: string;
  type: 'Convencional';
  capacity: number;
  model: string;
  shedManufacturer = new ShedManufacturer();
}

export class ShedManufacturer {
  id: number;
  manufacturer: string;
}
