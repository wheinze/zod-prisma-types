/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { WriteTypeFunction } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

/**
 * Checks if a type is a non scalar type e.g. enum,
 * object (like "User", "Post"), input object (like "UserWhereInput").
 *
 * If yes, it writes the corresponding zod type - if no, it returns undefined.
 *
 * @param writer CodeBlockWriter
 * @param options WriteTypeOptions
 * @returns CodeBlockWriter | undefined
 */
export const writeNonScalarType: WriteTypeFunction = (
  writer,
  { inputType, isOptional, isNullable, writeLazy = true, writeComma = true },
) => {
  const nonScalarType = inputType.getZodNonScalarType();
  if (!nonScalarType) return;

  return writer
    .conditionalWrite(writeLazy, `z.lazy(() => ${nonScalarType})`)
    .conditionalWrite(!writeLazy, `${nonScalarType}`)
    .conditionalWrite(inputType.isList, `.array()`)
    .conditionalWrite(isOptional, `.optional()`)
    .conditionalWrite(isNullable, `.nullable()`)
    .conditionalWrite(writeComma, `,`);
};
