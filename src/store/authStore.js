import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  DEFAULT_API_BASE_URL,
  normalizeBaseUrl,
  runtimeConfig,
} from '../utils/runtimeConfig'

const withRuntimeConfig = (state) => ({
  ...state,
  token: runtimeConfig.accessToken || state.token || null,
  baseUrl:
    runtimeConfig.apiBaseUrl ||
    normalizeBaseUrl(state.baseUrl) ||
    DEFAULT_API_BASE_URL,
})

export const useAuthStore = create(
  persist(
    (set) => ({
      token: runtimeConfig.accessToken || null,
      baseUrl: runtimeConfig.apiBaseUrl || DEFAULT_API_BASE_URL,

      setAuth: (token, baseUrl) =>
        set((state) =>
          withRuntimeConfig({
            ...state,
            token: token?.trim() || null,
            baseUrl: normalizeBaseUrl(baseUrl) || DEFAULT_API_BASE_URL,
          })
        ),

      logout: () =>
        set((state) =>
          withRuntimeConfig({
            ...state,
            token: null,
            baseUrl: DEFAULT_API_BASE_URL,
          })
        ),

      updateBaseUrl: (baseUrl) =>
        set((state) =>
          withRuntimeConfig({
            ...state,
            baseUrl: normalizeBaseUrl(baseUrl),
          })
        ),
    }),
    {
      name: 'svix-auth',
      merge: (persistedState, currentState) =>
        withRuntimeConfig({ ...currentState, ...persistedState }),
    }
  )
)
