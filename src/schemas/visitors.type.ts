import { isDto } from "../utils/is_dto.util";

export type TVisitors = {
  readonly id_user: number;
  email: string;
  password: string;
};

export type TVisitorsDto = Omit<TVisitors, "id_user">;

export const isTVisitorsDto = (obj: any): obj is TVisitorsDto => {
  // creo el array de propiedades esperadas del tipo TTransactionDto
  const keys_values = [
    { key: "name_email", type: "string" },
    { key: "password_hash", type: "string" },
  ];

  // devuelvo el resultado de la validación de esas propiedades
  return isDto<TVisitorsDto>(obj, keys_values);
};
