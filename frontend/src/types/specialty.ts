export interface Specialty {
  id: number;
  name: string;
}

export interface TopSpecialty extends Specialty {
  views: number;
  doctorCount: number;
  icon: string;
}
