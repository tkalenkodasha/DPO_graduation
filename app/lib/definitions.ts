export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type LatestContract = {
  id: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  email: string;
  photo_url: string;
  number: string;
};

export type LatestContractRaw = Omit<LatestContract, 'amount'> & {
  number: number;
};
export type LatestStudent = {
  id: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  email: string;
  photo_url: string;
  number: string;
};

export type LatestStudentRaw = Omit<LatestContract, 'amount'> & {
  number: number;
};

export type ContractsTable = {
  id: string;
  number: string;
  student_id: string;
  funding_source_id: string;
  contract_type_id: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  email: string;
  photo_url: string;
  enrollment_date: string;
  completion_date: string;
  contract_date: string;
  status: 'Активен' | 'Завершен';
  course_name: string;
  funding_source_name: string;
  contract_type_name: string;
  program_name: string | null;
};


export type StudentField = {
  id: string;
  last_name: string;
  first_name: string;
  middle_name: string;

};


export type ContractForm = {
  id: string;
  student_id: string;
  contract_type_id: string;
  funding_source_id: string;
  course_id: string;
  enrollment_date: string; // Используем string для дат в формах
  completion_date?: string;
  status: 'Активен' | 'Завершен';
  contract_date: string;
  number: string; // Добавляем номер договора
};


export type StudentForm = {
  id: string;
  last_name: string;
  first_name: string;
  middle_name?: string;
  email?: string;
  phone?: string;
  date_of_birth: string;
  gender_id: string;
  education_id: string;
  category_id?: string;
  subcategory_id?: string;
  passport_series?: string;
  passport_number?: string;
  issued_by?: string;
  issue_date?: string;
  inn?: string;
  snils?: string;
  address?: string;
  postal_code?: string;
  workplace?: string;
  university?: string;
  position?: string;
  photo_url?: string;
};

export type StudentsTableType = {
  id: string;
  last_name: string;
  first_name: string;
  middle_name?: string;
  email?: string;
  phone?: string;
  date_of_birth: string;
  gender_name: string;
  education_name: string;
  category_name?: string;
  subcategory_name?: string;
  passport_series?: string;
  passport_number?: string;
  issued_by?: string;
  issue_date?: string;
  inn?: string;
  snils?: string;
  address?: string;
  postal_code?: string;
  workplace?: string;
  university?: string;
  position?: string;
  photo_url?: string;

};

