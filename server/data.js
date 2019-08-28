import { printSchema } from 'graphql';
import convert from 'jsonschema2graphql';

const jsonSchema = {
  $id: 'person',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    age: {
      type: 'integer',
    },
  },
};

const schema = convert({ jsonSchema });

console.log(printSchema(schema));
