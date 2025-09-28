import { isDto } from "../utils/is_dto.util";
import { TTransaction } from "./transaction.type";

export type TTypeTransaction = {
  id_type_transaction: number;
  type_transaction_name: string;
};

export type TTypeTransactionDto = Omit<TTransaction, "id_transaction">;

export const isTTypeTransactionDto = (obj: any): obj is TTypeTransactionDto => {
  // creo el array de propiedades esperadas del tipo TTypeTransactionDto
  const keys_values = [{ key: "type_transaction_name", type: "string" }];

  // devuelvo el resultado de la validación de esas propiedades
  return isDto<TTypeTransactionDto>(obj, keys_values);
};
