import { isDto } from "../utils/is_dto.util";

export type TTransaction = {
  id_transaction: number;
  id_type_transaction: number;
};

export type TTransactionDto = Omit<TTransaction, "id_transaction">;

export const isTTransactionDto = (obj: any): obj is TTransactionDto => {
  // creo el array de propiedades esperadas del tipo TTransactionDto
  const keys_values = [{ key: "id_type_transaction", type: "number" }];

  // devuelvo el resultado de la validación de esas propiedades
  return isDto<TTransactionDto>(obj, keys_values);
};
