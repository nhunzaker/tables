import { request } from './request.js'
import { query } from './formula.js'

class Cell {
  constructor(value) {
    this.el = document.createElement('td')
    this.value = value
  }

  async render() {
    this.el.innerHTML = await query(this.value)
  }
}

export class Table {
  constructor(src) {
    this.el = document.createElement('table')
    this.src = src
  }

  read() {
    return request(this.src)
  }

  async render() {
    let [head, ...rows] = await this.read()

    let thead = this.el.createTHead().insertRow()
    let tbody = this.el.createTBody()

    head.forEach(cell => {
      thead.insertCell().innerHTML = cell
    })

    rows.forEach(entry => {
      let row = tbody.insertRow()

      for (var key in entry) {
        let cell = new Cell(entry[key])

        cell.render()

        row.appendChild(cell.el)
      }
    })

    return this.el
  }

  remove() {
    this.el.remove()
  }
}
