import {
  TPaginationDto,
  TPaginationDtoParams,
} from "../schemas/pagination.type";

/**
 * @param {number} page - las páginas comienzan a contarse desde el nro 1.
 */
export const getSqlPaginationQuery = (page: number, items_per_page: number) => {
  return ` LIMIT ${items_per_page} OFFSET ${items_per_page * (page - 1)}`;
};

export const getPaginationDtoFromParams = (pagParams: TPaginationDtoParams) => {
  const result: Partial<TPaginationDto> = {
    items_per_page: pagParams.items_per_page
      ? Number(pagParams.items_per_page)
      : undefined,
    page: pagParams.page ? Number(pagParams.page) : undefined,
  };
  return result;
};

export const getSqItemsInTableQuery = (table: string) =>
  `SELECT count(*) FROM ${table}`;
