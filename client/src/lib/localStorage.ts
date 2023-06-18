export const getFromLocalStorage = (tokenName: string) => {
  const token = localStorage.getItem(tokenName)
  return token
}
export const addToLocalStorage = (tokenName: string, token: string) => {
  localStorage.setItem(tokenName, token)
}
export const removeFromLocalStorage = (tokenName: string) => {
  localStorage.removeItem(tokenName)
}
