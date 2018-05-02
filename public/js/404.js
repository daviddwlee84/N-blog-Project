function randomNum () {
  'use strict'
  return Math.floor(Math.random() * 9) + 1
}
var i = 0
var time = 30
var selector3 = document.querySelector('.thirdDigit')
var selector2 = document.querySelector('.secondDigit')
var selector1 = document.querySelector('.firstDigit')
var loop3 = setInterval(function () {
  'use strict'
  if (i > 40) {
    clearInterval(loop3)
    selector3.textContent = 4
  } else {
    selector3.textContent = randomNum()
    i++
  }
}, time)
var loop2 = setInterval(function () {
  'use strict'
  if (i > 80) {
    clearInterval(loop2)
    selector2.textContent = 0
  } else {
    selector2.textContent = randomNum()
    i++
  }
}, time)
var loop1 = setInterval(function () {
  'use strict'
  if (i > 100) {
    clearInterval(loop1)
    selector1.textContent = 4
  } else {
    selector1.textContent = randomNum()
    i++
  }
}, time)
