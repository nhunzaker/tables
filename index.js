import { Table } from './src/table.js'

let table = new Table('./static/people.json')

document.body.appendChild(table.el)

table.render()
