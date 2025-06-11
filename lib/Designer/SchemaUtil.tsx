import { SchemaFieldDescription, SchemaObjectDescription } from 'yup';

function isRequired(description: SchemaObjectDescription['fields'][number]) {
  const d = description as any;
  return d.optional === false && d.nullable === false;
}

function isOneOfDescription(
  description: SchemaObjectDescription['fields'][number],
): description is SchemaObjectDescription['fields'][number] & { oneOf: string[] } {
  return 'oneOf' in description;
}

export type ArrayOfSchemaFieldDescription = SchemaFieldDescription & { innerType: SchemaFieldDescription };

function isArrayOfDescription(
  description: SchemaFieldDescription,
): description is ArrayOfSchemaFieldDescription {
  return 'innerType' in description;
}

export const SchemaUtil = {
  isRequired,
  isOneOfDescription,
  isArrayOfDescription,
};
