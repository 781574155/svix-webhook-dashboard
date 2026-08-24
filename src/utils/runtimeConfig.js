const DEFAULT_API_BASE_URL = 'https://api.svix.com'

const browserConfig =
  typeof window !== 'undefined' ? window.SVIX_DASHBOARD_CONFIG || {} : {}

const normalizeString = (value) =>
  typeof value === 'string' ? value.trim() : ''

const normalizeBaseUrl = (value) => normalizeString(value).replace(/\/+$/, '')

export const runtimeConfig = Object.freeze({
  apiBaseUrl: normalizeBaseUrl(browserConfig.API_BASE_URL),
  accessToken: normalizeString(browserConfig.ACCESS_TOKEN),
})

export const hasConfiguredApiBaseUrl = Boolean(runtimeConfig.apiBaseUrl)
export const hasConfiguredAccessToken = Boolean(runtimeConfig.accessToken)
export { DEFAULT_API_BASE_URL, normalizeBaseUrl }
