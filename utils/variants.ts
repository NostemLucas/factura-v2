import { tv } from 'tailwind-variants'

/**
 * Input variants using tailwind-variants
 */
export const inputVariants = tv({
  base: 'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      default: 'border-gray-300 focus:border-primary-500',
      error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
      success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
      warning: 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500'
    },
    size: {
      sm: 'h-8 px-2 text-xs',
      md: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base'
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    rounded: 'md'
  }
})

/**
 * Label variants using tailwind-variants
 */
export const labelVariants = tv({
  base: 'text-sm font-medium text-gray-700 mb-1 block',
  variants: {
    required: {
      true: "after:content-['*'] after:ml-0.5 after:text-red-500"
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed'
    }
  }
})

/**
 * Helper text variants using tailwind-variants
 */
export const helperTextVariants = tv({
  base: 'text-xs mt-1',
  variants: {
    variant: {
      default: 'text-gray-500',
      error: 'text-red-500',
      success: 'text-green-500',
      warning: 'text-yellow-500'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

/**
 * Input group variants using tailwind-variants
 */
export const inputGroupVariants = tv({
  base: 'flex',
  variants: {
    orientation: {
      horizontal: 'flex-row items-center',
      vertical: 'flex-col'
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
})

/**
 * Input addon variants using tailwind-variants
 */
export const inputAddonVariants = tv({
  base: 'flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-500',
  variants: {
    position: {
      leading: 'rounded-l-md border-r-0',
      trailing: 'rounded-r-md border-l-0'
    },
    size: {
      sm: 'h-8 px-2 text-xs',
      md: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base'
    }
  },
  defaultVariants: {
    position: 'leading',
    size: 'md'
  }
})
