export const registerStatusOptions = [
  { value: "UPCOMING", label: "UPCOMING" },
  { value: "ONGOING", label: "ONGOING" },
  { value: "ENDED", label: "ENDED" },
];

export type TSemSubmitData = {
  academicSemester: string;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
};

type AcademicSemester = {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
};

export type TSemRegisterData = {
  _id: string;
  academicSemester: AcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
};
