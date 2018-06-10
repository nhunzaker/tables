import { Table } from './table.js'

let source = document.createElement('pre')
let target = document.getElementById('app')
let table = new Table('/query?from=people')

app.appendChild(table.el)
app.appendChild(source)

table.read().then(data => {
  source.innerHTML = JSON.stringify(data, null, 2)
})

table.render()
