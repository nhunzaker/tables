import { request } from './request.js'

export class Cell {
  constructor(value, tagName = 'td') {
    this.el = document.createElement(tagName)
    this.value = value
  }

  isFormula() {
    return /^\?/.test(this.value)
  }

  async render() {
    if (this.isFormula()) {
      this.el.innerHTML = 'Loading &hellip;'
      this.el.innerHTML = await request(`/query${this.value}`)
    } else {
      this.el.innerHTML = this.value
    }
  }
}

export class Table {
  constructor(src) {
    this.el = document.createElement('table')
    this.src = src
  }

  async read() {
    let data = await request(this.src)

    return data
      .trim()
      .split('\n')
      .map(item => {
        return item.trim().split(',')
      })
  }

  async render() {
    let rows = await this.read()

    let tbody = this.el.createTBody()

    rows.forEach(entry => {
      let row = tbody.insertRow()

      entry.forEach(item => {
        let cell = new Cell(item)

        cell.render()
        row.appendChild(cell.el)
      })
    })

    return this.el
  }

  remove() {
    this.el.remove()
  }
}
