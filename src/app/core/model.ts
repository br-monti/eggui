//-------------------Grange Module------------------------------

export class ChickenLineage {
  id: number;
  lineage: string;
  provider: string;
  chickenColor: string;
}

export class ChickenLineageInput {
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

export class ShedInput {
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
  //eggLot =  new EggLot();

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

export class ProductionMonitoring {
  id: number;
  ageWeek: number;
  ageDay: number;
  dateWeek: Date;
  bodyWeight: number;
  food: number;
  water: number;
  discard: number;
  mortality: number;
  totalProduction: number;
  firstEggs: number;
  secondEggs: number;
  eggWeight: number;
  chickenLot = new ChickenLot();

}

//-------------------Industry Module------------------------------

export class EggLot {
  id: number;
  name: string;
  boxColor: string;
  chickenLots = new Array<ChickenLot>();
}

export class EggBase {
  id: number;
  quantity: number;
  categoryA: number;
  categoryB: number;
  discard: number;
  productionDate: Date;
  validityDate: Date;
  industryStatus: string;
  eggLot = new EggLot();
  classifications = new Array<Classification>();
}

export class EggType {
  id: number;
  type: string;
  category: string;
  minWeight: number;
  maxWeight: number;
}

export class Product {
  id: number;
  quantity: number;
  packing = new Packing();
}

export class Classification {
  id: number;
  quantity: number;
  eggType = new EggType();
  products = new Array<Product>();
  // eggBase = new EggBase();
}

export class Classif {
  id: number;
  quantity: number;
  eggType = new EggType();
  //products = new Array<Product>();
  // eggBase = new EggBase();
}

export class Packing {
  id: number;
  name: string;
  packingType: string;
  quantityByPacking: number;
  packingByBox: number;
  quantityByBox: number;
}


