import { Table, Cell } from './src/table.js'

let table = new Table('./static/people.csv')
let source = document.createElement("pre")

document.body.appendChild(table.el)
document.body.appendChild(source)

table.read().then(data => {
  source.innerHTML = JSON.stringify(data, null, 2)
})

table.render()
