import { z } from 'zod'
import { DELIVERY_AREAS } from './constants'

/**
 * Israeli phone number validation
 * Accepts: 05X-XXXXXXX, 05XXXXXXXX, with or without dashes/spaces
 */
export const israeliPhoneSchema = z
  .string()
  .min(1, 'מספר טלפון הוא שדה חובה')
  .transform(val => val.replace(/[\s-]/g, ''))
  .refine(
    val => /^05[0-9]{8}$/.test(val),
    'מספר טלפון לא תקין. יש להזין מספר טלפון נייד ישראלי (05X-XXXXXXX)'
  )

/**
 * Hebrew name validation
 * Allows Hebrew letters, spaces, hyphens, and apostrophes
 */
export const hebrewNameSchema = z
  .string()
  .min(2, 'שם חייב להכיל לפחות 2 תווים')
  .max(50, 'שם לא יכול לעלות על 50 תווים')
  .refine(
    val => /^[\u0590-\u05FF\s\-']+$/.test(val),
    'שם חייב להכיל אותיות בעברית בלבד'
  )

/**
 * Address validation
 * Minimum 5 characters, allows Hebrew, numbers, and common punctuation
 */
export const addressSchema = z
  .string()
  .min(5, 'כתובת חייבת להכיל לפחות 5 תווים')
  .max(100, 'כתובת לא יכולה לעלות על 100 תווים')

/**
 * City validation
 * Must be one of the delivery areas
 */
export const citySchema = z
  .string()
  .min(1, 'יש לבחור עיר למשלוח')
  .refine(
    val => DELIVERY_AREAS.includes(val),
    'אזור זה אינו בתחום המשלוחים שלנו'
  )

/**
 * Delivery time validation
 */
export const deliveryTimeSchema = z
  .string()
  .min(1, 'יש לבחור זמן משלוח')

/**
 * Notes validation (optional)
 */
export const notesSchema = z
  .string()
  .max(500, 'הערות לא יכולות לעלות על 500 תווים')
  .optional()
  .default('')

/**
 * Complete order form schema
 */
export const orderFormSchema = z.object({
  fullName: hebrewNameSchema,
  phone: israeliPhoneSchema,
  address: addressSchema,
  city: citySchema,
  deliveryTime: deliveryTimeSchema,
  notes: notesSchema,
})

export type OrderFormSchema = z.infer<typeof orderFormSchema>

/**
 * Validate a single field
 */
export function validateField<T extends keyof OrderFormSchema>(
  field: T,
  value: string
): { success: boolean; error?: string } {
  const schemas: Record<keyof OrderFormSchema, z.ZodTypeAny> = {
    fullName: hebrewNameSchema,
    phone: israeliPhoneSchema,
    address: addressSchema,
    city: citySchema,
    deliveryTime: deliveryTimeSchema,
    notes: notesSchema,
  }

  const result = schemas[field].safeParse(value)

  if (result.success) {
    return { success: true }
  }

  return {
    success: false,
    error: result.error.errors[0]?.message,
  }
}
