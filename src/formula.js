import { request } from './request.js'

const pattern = /^\=(\w+?)\((.+?)\)$/

function where(data, key, value, pluck) {
  let [head, ...rows] = data

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
  if (pattern.test(value) === false) {
    return value
  }

  let [_, formula, args] = value.match(pattern)

  switch (formula) {
    case 'where':
      let [src, ...params] = args.split(',').map(string => string.trim())
      return where(await request(src), ...params)
    default:
      return `UNKNOWN: ${formula}`
  }
}
