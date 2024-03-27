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
