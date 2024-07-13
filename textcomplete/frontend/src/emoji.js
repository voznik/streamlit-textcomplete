
let promise;

/**
 * @returns {Promise<[string, string][]>} Promise of emoji key-value pairs
 */
const load = async () => {
  if (promise == null) {
    promise = new Promise(async (resolve) => {
      const response = await fetch("https://api.github.com/emojis")
      resolve(Object.entries(await response.json()))
    })
  }
  return promise
}

/**
 * @param {string} term
 * @param {number} limit
 * @returns {Promise<[string, string][]>} Promise of emoji key-value pairs
 */
export const startsWith = async (
  term,
  limit = 10
) => {
  const kvs = await load()
  const results = []
  // Whether previous key started with the term
  let prevMatch = false
  for (const [key, url] of kvs) {
    if (key.startsWith(term)) {
      results.push([key, url])
      if (results.length === limit) break
      prevMatch = true
    } else if (prevMatch) {
      break
    }
  }
  return results
}
