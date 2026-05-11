export type VehicleType = "car" | "bike";

export interface Brand {
  id: string;
  name: string;
  models: string[];
}

export const CAR_BRANDS: Brand[] = [
  {
    id: "maruti",
    name: "Maruti Suzuki",
    models: ["Alto", "Alto K10", "WagonR", "Celerio", "Swift", "Swift Dzire", "Baleno", "Ignis", "Ciaz", "Vitara Brezza", "Ertiga", "XL6", "Grand Vitara", "Fronx", "Jimny", "Invicto"],
  },
  {
    id: "hyundai",
    name: "Hyundai",
    models: ["Santro", "i10 Nios", "i20", "Aura", "Venue", "Creta", "Alcazar", "Verna", "Tucson", "Ioniq 5"],
  },
  {
    id: "tata",
    name: "Tata",
    models: ["Tiago", "Tiago EV", "Tigor", "Tigor EV", "Altroz", "Punch", "Punch EV", "Nexon", "Nexon EV", "Harrier", "Safari", "Curvv", "Curvv EV"],
  },
  {
    id: "honda",
    name: "Honda",
    models: ["Amaze", "City", "City Hybrid", "Jazz", "WR-V", "Elevate"],
  },
  {
    id: "mahindra",
    name: "Mahindra",
    models: ["KUV100", "Bolero", "Bolero Neo", "Scorpio Classic", "Scorpio N", "XUV 3XO", "XUV400", "XUV700", "Thar", "Thar Roxx", "BE6", "XEV 9e"],
  },
  {
    id: "toyota",
    name: "Toyota",
    models: ["Glanza", "Urban Cruiser Hyryder", "Innova Crysta", "Innova HyCross", "Fortuner", "Legender", "Camry", "Vellfire"],
  },
  {
    id: "kia",
    name: "Kia",
    models: ["Sonet", "Seltos", "Carens", "EV6", "Carnival", "EV9"],
  },
  {
    id: "renault",
    name: "Renault",
    models: ["Kwid", "Triber", "Kiger", "Duster"],
  },
  {
    id: "volkswagen",
    name: "Volkswagen",
    models: ["Polo", "Vento", "Taigun", "Virtus"],
  },
  {
    id: "skoda",
    name: "Skoda",
    models: ["Slavia", "Kushaq", "Octavia", "Superb", "Kodiaq"],
  },
  {
    id: "mg",
    name: "MG",
    models: ["Hector", "Hector Plus", "ZS EV", "Astor", "Gloster", "Comet EV", "Windsor EV"],
  },
  {
    id: "jeep",
    name: "Jeep",
    models: ["Compass", "Meridian", "Wrangler", "Grand Cherokee"],
  },
  {
    id: "nissan",
    name: "Nissan",
    models: ["Magnite", "Kicks", "X-Trail"],
  },
  {
    id: "bmw",
    name: "BMW",
    models: ["2 Series", "3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "iX", "i4"],
  },
  {
    id: "audi",
    name: "Audi",
    models: ["A4", "A6", "A8", "Q3", "Q5", "Q7", "Q8", "e-tron", "e-tron GT"],
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    models: ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "EQS"],
  },
  {
    id: "ford",
    name: "Ford",
    models: ["EcoSport", "Endeavour", "Aspire", "Freestyle", "Figo"],
  },
  {
    id: "citroen",
    name: "Citroen",
    models: ["C3", "C3 Aircross", "C5 Aircross", "eC3"],
  },
];

export const BIKE_BRANDS: Brand[] = [
  {
    id: "hero",
    name: "Hero",
    models: ["HF Deluxe", "Splendor Plus", "Splendor+", "Passion Pro", "Glamour", "Xtreme 125R", "Xtreme 160R", "Xtreme 200R", "Destini 125", "Maestro Edge 125", "Xoom 110"],
  },
  {
    id: "honda",
    name: "Honda",
    models: ["Activa 6G", "Activa 125", "CB Shine", "SP 125", "Shine 100", "Dio", "Grazia", "CB Unicorn", "CB Hornet 2.0", "CB300R", "CB350", "CB350RS", "CB500F", "CBR650R"],
  },
  {
    id: "bajaj",
    name: "Bajaj",
    models: ["CT100", "Platina 100", "Platina 110", "Pulsar 125", "Pulsar 150", "Pulsar N160", "Pulsar 180", "Pulsar 220F", "Pulsar N250", "Pulsar RS200", "Dominar 250", "Dominar 400", "Avenger Street 160", "Avenger Cruise 220", "Chetak"],
  },
  {
    id: "tvs",
    name: "TVS",
    models: ["XL100", "Sport", "Star City+", "Radeon", "Jupiter", "NTORQ 125", "Raider 125", "Apache RTR 160", "Apache RTR 160 4V", "Apache RTR 200 4V", "Apache RR 310", "iQube"],
  },
  {
    id: "royalenfield",
    name: "Royal Enfield",
    models: ["Bullet 350", "Classic 350", "Meteor 350", "Hunter 350", "Himalayan 450", "Continental GT 650", "Interceptor 650", "Guerrilla 450", "Bear 650", "Shotgun 650"],
  },
  {
    id: "yamaha",
    name: "Yamaha",
    models: ["FZ-S V3", "FZ-X", "FZ25", "R15M", "R15 V4", "MT-15 V2", "Aerox 155", "Ray ZR 125", "Fascino 125"],
  },
  {
    id: "ktm",
    name: "KTM",
    models: ["Duke 125", "Duke 200", "Duke 390", "RC 125", "RC 390", "Adventure 250", "Adventure 390"],
  },
  {
    id: "suzuki",
    name: "Suzuki",
    models: ["Gixxer 150", "Gixxer SF 150", "Gixxer 250", "Gixxer SF 250", "Access 125", "Burgman Street 125", "Hayabusa"],
  },
  {
    id: "kawasaki",
    name: "Kawasaki",
    models: ["Ninja 300", "Ninja 400", "Ninja 650", "Z650", "Versys 650", "Vulcan S", "W800"],
  },
  {
    id: "ola",
    name: "Ola Electric",
    models: ["S1 Air", "S1 X", "S1 Pro", "S1 X+"],
  },
  {
    id: "ather",
    name: "Ather",
    models: ["450S", "450X", "450 Apex", "Rizta"],
  },
];

export function getBrands(type: VehicleType): Brand[] {
  return type === "car" ? CAR_BRANDS : BIKE_BRANDS;
}
