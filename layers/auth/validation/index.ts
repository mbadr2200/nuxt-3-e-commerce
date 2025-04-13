/**
 * Authentication Validation Schemas
 * 
 * This module defines Zod validation schemas for login and registration forms.
 * Each schema specifies the required fields and their validation rules.
 */

import * as z from 'zod'

/**
 * Login Form Validation Schema
 * Validates the email and password fields for login.
 * 
 * Rules:
 * - Email must be a valid email address
 * - Password must be at least 8 characters long
 */
export const loginSchema = z.object({
    // Email validation with custom error message
    email: z.string().email({message: 'Invalid email address'}),
    // Password validation with custom error message
    password: z.string().min(8,{message: 'Password must be at least 8 characters long'}),
})

/**
 * Registration Form Validation Schema
 * Validates all fields required for user registration.
 * 
 * Rules:
 * - Name is required
 * - Email must be a valid email address
 * - Password must be at least 8 characters long
 * - Avatar must be a valid URL
 */
export const registerSchema = z.object({
    // Name validation with custom error message
    name: z.string().min(1,{message: 'Name is required'}),
    // Email validation with custom error message
    email: z.string().email({message: 'Invalid email address'}),
    // Password validation with custom error message
    password: z.string().min(8,{message: 'Password must be at least 8 characters long'}),
    // Avatar URL validation with custom error message
    avatar: z.string().url({message: 'Invalid avatar URL'}),
})