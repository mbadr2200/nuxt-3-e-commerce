import { toast } from 'vue-sonner'

// More precise error type definition
type ErrorLike = string | { message: string } | Error | unknown

// Define error object types
interface ErrorWithData {
  data?: {
    message?: string | string[]
  }
}

interface ErrorWithResponse {
  response?: {
    data?: {
      message?: string | string[]
    }
  }
}

// Refined options interface with default values
interface HandleErrorOptions {
  throw?: boolean
  withToast?: boolean
  defaultMessage?: string
}

export default function handleError(
  error: ErrorLike,
  options: HandleErrorOptions = {},
): string {
  // Destructure with default values
  const { throw: shouldThrow = false, withToast = true, defaultMessage = 'An unexpected error occurred' } = options

  // Early return for falsy/null errors
  if (error === null || error === undefined)
    return defaultMessage

  // Improved error string extraction
  const errorString = (() => {
    if (typeof error === 'string') {
      return error
    }
    if (error instanceof Error) {
      return error.message
    }
    if (typeof error === 'object' && error !== null) {
      const err = error as ErrorWithResponse & ErrorWithData
      
      // Handle Axios error structure
      if (err.response?.data?.message) {
        return Array.isArray(err.response.data.message) 
          ? err.response.data.message.join(', ')
          : err.response.data.message
      }
      // Handle custom error objects
      if ('message' in err && typeof err.message === 'string') {
        return err.message
      }
      // Handle array of messages
      if ('message' in err && Array.isArray(err.message)) {
        return err.message.join(', ')
      }
      // Handle nested data structure
      if (err.data?.message) {
        return Array.isArray(err.data.message)
          ? err.data.message.join(', ')
          : err.data.message
      }
    }
    return defaultMessage
  })()

  // Clean error message
  let readableError = errorString
    .replace(/^Error:\s*/i, '') // Remove "Error:" prefix
    .replace(/^\[.*\]\s*/, '') // Remove any [Error] prefixes
    .trim()

  // Handle common HTTP error codes
  if (readableError.includes('401')) {
    readableError = 'Invalid credentials'
  } else if (readableError.includes('403')) {
    readableError = 'Access denied'
  } else if (readableError.includes('404')) {
    readableError = 'Resource not found'
  } else if (readableError.includes('500')) {
    readableError = 'Server error'
  } else if (readableError.includes('Network Error')) {
    readableError = 'Network connection error'
  }

  // Log error for debugging
  if (import.meta.dev) {
    console.error('Error details:', {
      originalError: error,
      processedError: readableError,
      options
    })
  }

  // Conditional toast (only on client)
  if (withToast && import.meta.client) {
    toast.error(readableError)
  }

  // Conditional throwing
  if (shouldThrow) {
    throw new Error(readableError)
  }

  return readableError
}
