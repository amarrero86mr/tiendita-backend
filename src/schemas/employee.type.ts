import { isDto } from "../utils/is_dto.util";

export type TEmployee = {
  id_employee: string;
  employee_name: string;
  active: boolean;
};

export type TEmployeeDto = Omit<TEmployee, "id_employee">;

export const isTEmployeeDto = (
  employeeDto: any
): employeeDto is TEmployeeDto => {
  const employee_dto_keys_values = [
    { key: "employee_name", type: "string" },
    { key: "active", type: "boolean" },
  ];

  return isDto<TEmployeeDto>(employeeDto, employee_dto_keys_values);
};
