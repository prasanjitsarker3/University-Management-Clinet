export interface Root {
  password: string;
  student: TStudent;
}

export interface TStudent {
  _id: string;
  id?: string;
  name: Name;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  admissionSemester: string;
  academicDepartment: string;
  fullName?: string;
}

export interface Name {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface LocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}
