import { create } from 'zustand'

interface UIState {
  // Loading states
  isPageLoading: boolean
  isSubmitting: boolean

  // Actions
  setPageLoading: (loading: boolean) => void
  setSubmitting: (submitting: boolean) => void
}

export const useUIStore = create<UIState>(set => ({
  isPageLoading: false,
  isSubmitting: false,

  setPageLoading: (loading: boolean) => {
    set({ isPageLoading: loading })
  },

  setSubmitting: (submitting: boolean) => {
    set({ isSubmitting: submitting })
  },
}))
