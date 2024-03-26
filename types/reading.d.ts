export type ReadingType = {
  id?: string;
  temperature: { value: number; isInRange: boolean };
  humidity: { value: number; isInRange: boolean };
  chemicalData: {
    name: string;
    weight: number;
    isInRange: boolean;
  }[];
  createdAt: number;
};
