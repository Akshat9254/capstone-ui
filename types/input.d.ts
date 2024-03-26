export type RegisterMedicineRequest = {
  medicineName: string;
  chemicalData: {
    name: string;
    ratio: number;
  }[];
  temperatureRange: {
    min: number;
    max: number;
  };
  humidityRange: {
    min: number;
    max: number;
  };
};

export type AddBatchRequest = {
  batchId: string;
  manufacturerName: string;
  medicineName: string;
};
