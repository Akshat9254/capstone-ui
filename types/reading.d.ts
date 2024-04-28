export type ReadingType = {
  id?: string;
  temperature: { value: number; isInRange: boolean };
  humidity: { value: number; isInRange: boolean };
  // chemicalData: {
  //   name: string;
  //   weight: number;
  //   isInRange: boolean;
  // }[];
  createdAt: number;
};

export type SensorDataResponse = [
  bigint[],
  bigint[],
  bigint[],
  // bigint[][],
  // string[][],
  string
];

export type BatchDetailsType = {
  temperatures: number[];
  humidities: number[];
  createdAts: number[];
  // chemicalWeights: number[][];
  // chemicalNames: string[][];
  medicineName: string;
};

export type MedicineDataType = {
  temperature: {
    min: number;
    max: number;
  };
  humidity: {
    min: number;
    max: number;
  };
  // chemicalData: {
  //   name: string;
  //   ratio: number;
  // }[];
};
