// types.ts (frontend)
export interface Localization {
  name: string;
  description: string;
}

export interface ParentDepartment {
  id: number;
  name: string;
}

export interface employee {
  id: number;
  name: string;
  role: string;
  contact: string;
}

export interface department {
  name: string;
  description: string;
  localization: Localization;
  code: number;
  manager: string;
  location: string;
  employeesNumber: number;
  status: boolean;
  parentDepartment?: ParentDepartment;
  createdAt: string;
  employees: employee[];
}
