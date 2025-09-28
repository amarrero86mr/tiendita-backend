import { isDto } from "../utils/is_dto.util";

export type TPagination<T> = {
  items_per_page: number;
  total_items: number;
  total_pages: number;
  page: number;
  data: Array<T>;
};

export type TPaginationDto = { items_per_page: number; page: number };

export type TPaginationDtoParams = {
  [key in keyof TPaginationDto]: string | undefined;
};

export const isTPaginationDto = (obj: any): obj is TPaginationDto => {
  const pagination_dto_keys_values = [
    { key: "items_per_page", type: "number" },
    { key: "page", type: "number" },
  ];

  const isPaginationDtoObj = isDto<TPaginationDto>(
    obj,
    pagination_dto_keys_values
  );

  const valuesInRange = obj.items_per_page > 0 && obj.page >= 1;

  return isPaginationDtoObj && valuesInRange;
};
