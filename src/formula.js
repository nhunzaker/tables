import { request } from './request.js'

async function where({ src, key, value, pluck }) {
  let [head, ...rows] = await request(src)

  let index = head.indexOf(key)
  let pluckIndex = head.indexOf(pluck)

  for (var row of rows) {
    if (row[index] == value) {
      return row[pluckIndex]
    }
  }

  return 'Missing'
}

export async function query(value) {
  if (!value || typeof value !== 'object') {
    return value
  }

  let { formula, params } = value

  switch (formula) {
    case 'where':
      return where(params)
    default:
      return `UNKNOWN: ${formula}`
  }
}
