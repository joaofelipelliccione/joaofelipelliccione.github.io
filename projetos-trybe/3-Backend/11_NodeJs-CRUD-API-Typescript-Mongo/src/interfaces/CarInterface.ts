import { z } from 'zod';
import vehicleSchema from './VehicleInterface';

/* carSchema engloba todos os atributos e verificações de vehicleSchema, além de adicionar mais 2 novos.  */
const carSchema = vehicleSchema.extend({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

export type Car = z.infer<typeof carSchema>; // Criando, de forma explicita, um novo tipo definido a partir do schema acima.
export default carSchema;