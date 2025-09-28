export const isDto = <T>(
  dto_obj: any,
  dto_keys_values: Array<{ key: string; type: string }>
): dto_obj is T => {
  // si el argumento es de tipo objeto
  if (typeof dto_obj === "object") {
    // se recorrerán todas sus keys, para ver si esa propiedad existe y tiene ese tipo de valor
    return dto_keys_values.every((pair) => {
      return typeof dto_obj[pair.key] === pair.type;
    });
  }
  return false;
};
