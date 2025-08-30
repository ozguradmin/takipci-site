const ADMIN_CREDENTIALS = {
  username: "ozguradmin",
  password: "o86741711",
} as const

export function validateAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export function getAdminUsername(): string {
  return ADMIN_CREDENTIALS.username
}
