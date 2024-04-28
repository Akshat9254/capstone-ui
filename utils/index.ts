import {
  BatchDetailsType,
  MedicineDataType,
  SensorDataResponse,
} from "types/reading";

export const allBatchesResponseMapper = (originalResponse: string[][]) => {
  const batchIds = originalResponse[0];
  const medicineNames = originalResponse[1];
  const numReadingsData = originalResponse[2].map((n) =>
    parseInt(n.toString())
  );
  const createdAts = originalResponse[3].map((n) => parseInt(n.toString()));
  const response = [];
  for (let i = 0; i < batchIds.length; i++) {
    response.push({
      id: batchIds[i],
      medicineName: medicineNames[i],
      numReadings: numReadingsData[i],
      createdAt: createdAts[i],
    });
  }

  return response;
};

export const serializeSensorData = (originalResponse: SensorDataResponse) => {
  const temperatures = originalResponse[0];
  const humidities = originalResponse[1];
  const createdAts = originalResponse[2];
  // const chemicalWeights = originalResponse[3];
  // const chemicalNames = originalResponse[4];
  const medicineName = originalResponse[3];
  return {
    temperatures: temperatures.map((value) => parseInt(value.toString())),
    humidities: humidities.map((value) => parseInt(value.toString())),
    createdAts: createdAts.map((value) => parseInt(value.toString())),
    // chemicalWeights: chemicalWeights.map((weights) =>
    //   weights.map((weight) => parseInt(weight.toString()))
    // ),
    // chemicalNames,
    medicineName,
  };
};

export const transformResponse = (
  response: BatchDetailsType,
  medicineData: MedicineDataType
) => {
  const transformedData = [];

  for (let i = 0; i < response.temperatures.length; i++) {
    const temperature = {
      value: response.temperatures[i],
      isInRange:
        medicineData.temperature.min <= response.temperatures[i] &&
        response.temperatures[i] <= medicineData.temperature.max,
    };
    const humidity = {
      value: response.humidities[i],
      isInRange:
        medicineData.humidity.min <= response.humidities[i] &&
        response.humidities[i] <= medicineData.humidity.max,
    };
    const createdAt = response.createdAts[i];
    // const chemicals = [];

    // const chemicalNamesVsRatioMap: { [key: string]: number } = {};

    // for (let j = 0; j < medicineData.chemicalData.length; j++) {
    //   chemicalNamesVsRatioMap[medicineData.chemicalData[j].name.trimEnd()] =
    //     medicineData.chemicalData[j].ratio;
    // }

    // Calculate total weight of chemicals
    // let totalWeight = 0;
    // for (let j = 0; j < response.chemicalNames[i].length; j++) {
    //   totalWeight += response.chemicalWeights[i][j];
    // }

    // Calculate total parts based on predefined ratios
    // let totalParts = 0;
    // for (let j = 0; j < medicineData.chemicalData.length; j++) {
    //   totalParts += medicineData.chemicalData[j].ratio;
    // }

    // for (let j = 0; j < response.chemicalNames[i].length; j++) {
    //   const chemicalName = response.chemicalNames[i][j];
    //   const chemicalWeight = response.chemicalWeights[i][j];
    //   const lhs = chemicalNamesVsRatioMap[chemicalName] * totalWeight;
    //   const rhs = chemicalWeight * totalParts;
    //   chemicals.push({
    //     name: chemicalName,
    //     weight: chemicalWeight,
    //     isInRange: lhs === rhs,
    //   });
    // }

    transformedData.push({
      temperature,
      humidity,
      // chemicalData: chemicals,
      createdAt,
    });
  }

  // for (let i = 0; i < transformedData.length; i++) {
  //   console.log(transformedData[i].chemicalData);
  // }

  return transformedData;
};
