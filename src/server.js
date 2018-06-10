const { spawn } = require('child_process')
const express = require('express')

const app = express()

app.use(express.static(`${__dirname}/public`))

/**
 * TODO: This is a pretty massive SQL injection :)
 */
app.get('/query', async (req, res) => {
  let { select = '*', from, where, limit, group, order } = req.query

  let command = `SELECT ${select} FROM ./static/${from}.csv`

  if (where) {
    command += ` WHERE ${where}`
  }

  if (limit) {
    command += ` LIMIT ${limit}`
  }

  if (order) {
    command += ` ORDER BY ${order}`
  }

  if (group) {
    command += ` GROUP BY ${group}`
  }

  res.set('X-Query', command)
  res.set('Content-Type', 'text/plain')

  let child = spawn('q', [
    '--skip-header',
    '--delimiter=,',
    '--output-delimiter=,',
    command
  ])

  child.stdout.pipe(res)

  child.stderr.on('data', data => {
    child.kill()
    res.status(500).send(data)
  })
})

app.listen(3000, () => {
  console.log('Tables is serving on http://localhost:3000')
})
