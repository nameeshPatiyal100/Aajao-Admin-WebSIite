export interface Attendant {
    id: string;
    name: string;
    age: number;
    email: string;
    date: string;
    status: "Active" | "Inactive";
  }
  
  export type ModalMode = "add" | "view" | "edit";
  