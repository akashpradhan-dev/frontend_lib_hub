/**
 * Sets a value in localStorage.
 * @template T
 * @param {string} key The key to store the value under.
 * @param {T} value The value to store. It will be stringified to JSON.
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

/**
 * Gets a value from localStorage and parses it.
 * @template T
 * @param {string} key The key to retrieve the value from.
 * @returns {T | null} The parsed value, or null if the key doesn't exist or an error occurs.
 */
export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key)
    if (!item) {
      return null
    }
    return JSON.parse(item) as T
  } catch (error) {
    console.error('Error retrieving from localStorage:', error)
    return null
  }
}

/**
 * Removes a value from localStorage.
 * @param {string} key The key to remove.
 */
export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

/**
 * Clears all items from localStorage.
 */
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}
