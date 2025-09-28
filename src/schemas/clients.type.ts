import { isDto } from "../utils/is_dto.util";

export type TClient = {
  readonly id_client: number;
  client_name: string;
  active: boolean;
};

export type TClientDto = Omit<TClient, "id_client">;

export const isTClientDto = (obj: any): obj is TClientDto => {
  // creo el array de propiedades esperadas del tipo TTransactionDto
  const keys_values = [
    { key: "client_name", type: "string" },
    { key: "active", type: "boolean" },
  ];

  // devuelvo el resultado de la validación de esas propiedades
  return isDto<TClientDto>(obj, keys_values);
};
