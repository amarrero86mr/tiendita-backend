import { isDto } from "../utils/is_dto.util";

//type de los proveedores
export type TSupplier = {
  id_supplier: number;
  supplier_name: string;
  email: string;
  active: boolean;
};

export type TSupplierDto = Omit<TSupplier, "id_supplier">;

export const isTSupplierDto = (
  supplierDto: any
): supplierDto is TSupplierDto => {
  const supplier_dto_keys_values = [
    { key: "supplier_name", type: "string" },
    { key: "email", type: "string" },
    { key: "active", type: "boolean" },
  ];

  return isDto<TSupplierDto>(supplierDto, supplier_dto_keys_values);
};
