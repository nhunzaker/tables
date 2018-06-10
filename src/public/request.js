export async function request(src) {
  let response = await fetch(src)

  if (response.ok) {
    return response.text()
  }

  throw new Error(`${response.status}: ${response.statusText}`)
}
