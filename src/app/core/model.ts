//-------------------Grange Module------------------------------

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
  productionDate: Date;
  validityDate: Date;
  eggLot = new EggLot();
}

export class EggType {
  id: number;
  type: string;
  category: string;
  minWeight: number;
  maxWeight: number;
}

export class Classification {
  id: number;
  quantity: number;
  eggType = new EggType();
  eggBase = new EggBase();
}
