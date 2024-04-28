import { RegisterMedicineRequest } from "../types/input";
import { useState } from "react";
import { z } from "zod";

type FormSchema = RegisterMedicineRequest;

const formSchema = z.object({
  medicineName: z.string().min(1, { message: "Must not be empty" }),
  temperatureRange: z
    .object({
      min: z.number().int(),
      max: z.number().int(),
    })
    .refine((range) => range.min <= range.max, {
      message: "Min must be less than or equal to Max.",
    }),
  humidityRange: z
    .object({
      min: z.number().int(),
      max: z.number().int(),
    })
    .refine((range) => range.min <= range.max, {
      message: "Min must be less than or equal to Max",
    }),
  // chemicalData: z.array(
  //   z.object({
  //     name: z.string().min(1, {
  //       message: "Name must not be empty, and Ratio must be a positive integer",
  //     }),
  //     ratio: z.number().int().positive(),
  //   })
  // ),
});

const defaultValues: FormSchema = {
  medicineName: "",
  temperatureRange: { min: 0, max: 0 },
  humidityRange: { min: 0, max: 0 },
  // chemicalData: [{ name: "", ratio: 0 }],
};

const useAddMedicine = () => {
  const [formData, setFormData] = useState<FormSchema>(defaultValues);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const handleMedicineNameChange = (value: string) => {
    setFormData((prev) => ({ ...prev, medicineName: value }));
    setErrors((prev) => ({ ...prev, medicineName: null }));
  };

  const handleTemperatureMinChange = (value: string) => {
    const valueAsNumber = value ? parseInt(value) : 0;
    setFormData((prev) => ({
      ...prev,
      temperatureRange: { ...prev.temperatureRange, min: valueAsNumber },
    }));
    setErrors((prev) => ({ ...prev, temperatureRange: null }));
  };

  const handleTemperatureMaxChange = (value: string) => {
    const valueAsNumber = value ? parseInt(value) : 0;
    setFormData((prev) => ({
      ...prev,
      temperatureRange: { ...prev.temperatureRange, max: valueAsNumber },
    }));
    setErrors((prev) => ({ ...prev, temperatureRange: null }));
  };

  const handleHumidityMinChange = (value: string) => {
    const valueAsNumber = value ? parseInt(value) : 0;
    setFormData((prev) => ({
      ...prev,
      humidityRange: { ...prev.humidityRange, min: valueAsNumber },
    }));
    setErrors((prev) => ({ ...prev, humidityRange: null }));
  };

  const handleHumidityMaxChange = (value: string) => {
    const valueAsNumber = +value;
    setFormData((prev) => ({
      ...prev,
      humidityRange: { ...prev.humidityRange, max: valueAsNumber },
    }));
    setErrors((prev) => ({ ...prev, humidityRange: null }));
  };

  const handleChemicalNameChange = (value: string, index: number) => {
    // setFormData((prev) => {
    //   const newChemicalData = prev.chemicalData.map((data, prevIndex) => {
    //     if (prevIndex !== index) return { ...data };
    //     return { ...data, name: value };
    //   });
    //   return { ...prev, chemicalData: newChemicalData };
    // });
  };

  const handleChemicalRatioChange = (value: string, index: number) => {
    // const valueAsNumber = +value;
    // setFormData((prev) => {
    //   const newChemicalData = prev.chemicalData.map((data, prevIndex) => {
    //     if (prevIndex !== index) return { ...data };
    //     return { ...data, ratio: valueAsNumber };
    //   });
    //   return { ...prev, chemicalData: newChemicalData };
    // });
  };

  // const handleInputChange = ()

  const handleRemoveChemicalData = (index: number) => {
    // if (formData.chemicalData.length === 1) return;
    // setFormData((prev) => {
    //   const newChemicalData = prev.chemicalData.filter(
    //     (_, prevIndex) => prevIndex !== index
    //   );
    //   return { ...prev, chemicalData: newChemicalData };
    // });
  };

  const handleAddChemicalData = () => {
    // setFormData((prev) => {
    //   const newChemicalData = [...prev.chemicalData, { name: "", ratio: 0 }];
    //   return { ...prev, chemicalData: newChemicalData };
    // });
  };

  const resetForm = () => {
    setFormData({ ...defaultValues });
    setErrors({});
  };

  return {
    formData,
    resetForm,
    formSchema,
    errors,
    setErrors,
    handleMedicineNameChange,
    handleTemperatureMinChange,
    handleTemperatureMaxChange,
    handleHumidityMinChange,
    handleHumidityMaxChange,
    handleChemicalNameChange,
    handleChemicalRatioChange,
    handleRemoveChemicalData,
    handleAddChemicalData,
  };
};

export default useAddMedicine;
