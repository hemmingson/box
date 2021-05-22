window.$ = document.querySelectorAll.bind(document)

Node.prototype.on = window.on = function (name, callback) {
  this.addEventListener(name, callback)
}

NodeList.prototype.__proto__ = Array.prototype

NodeList.prototype.on = NodeList.prototype.addEventListener = function (
  name,
  callback
) {
  this.forEach((element) => {
    element.on(name, callback)
  })
}
