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
