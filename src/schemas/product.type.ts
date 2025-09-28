import { isDto } from "../utils/is_dto.util";

export type TProduct = {
  id_product: number;
  product_name: string;
  product_description: string;
  stock: number;
  price: number;
};

export type TProductDto = Omit<TProduct, "id_product">;

export const isTProductDto = (product: any): product is TProductDto => {
  const product_dto_keys_values = [
    { key: "product_name", type: "string" },
    { key: "product_description", type: "string" },
    { key: "stock", type: "number" },
    { key: "price", type: "number" },
  ];

  return isDto<TProductDto>(product, product_dto_keys_values);
};
