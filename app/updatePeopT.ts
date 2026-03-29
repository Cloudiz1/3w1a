export interface BloodPressure {
  systolic: number;
  diastolic: number;
}

export interface Patient {
  id: number;
  age: number;
  height_cm: number;
  weight_kg: number;
  blood_pressure: BloodPressure;
  gender: string;
  conditions: string[];
  [key: string]: any; // Allows for dynamic "New Attributes"
}