export interface IPatient {
  id: string;
  name: string;
  gender: "male" | "female" | "other" | "unknown";
  birthDate: Date;
}
