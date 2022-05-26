import { z } from 'zod'; // Biblioteca p/ verificação de conteúdo do body.

const vehicleSchema = z.object({
  model: z.string().min(3),
  year: z.number().gte(1900).lte(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type Vehicle = z.infer<typeof vehicleSchema>; // Criando, de forma explicita, um novo tipo definido a partir do schema acima.
export default vehicleSchema;

/*
// Formato de estruturação de mensagens quando as informações enviadas no body da requisição, não seguirem os parâmetros definidos no schema.
  model: z.string({
    required_error: 'Model is required.',
    invalid_type_error: 'Model must be a string.',
  }).min(3, { message: 'Model must have 3 or more characters.' }),
*/