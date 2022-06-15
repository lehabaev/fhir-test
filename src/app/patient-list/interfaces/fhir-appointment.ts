interface IFhirAppointmentParticipant {
  actor: {
    display?: string;
    reference?: string;
  }
}

export interface IFhirAppointment {
  id: string;
  status: "proposed" | "pending" | "booked" | "arrived" |
    "fulfilled" | "cancelled" | "noshow" | "entered-in-error"
    | "checked-in" | "waitlist";
  start: Date;
  description: string;
  participant: IFhirAppointmentParticipant[]
}
