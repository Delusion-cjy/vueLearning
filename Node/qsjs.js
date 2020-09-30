var qs = require('qs')
var assert = require('assert')

var obj = qs.parse('a=c')
console.log(obj)
assert.deepEqual(obj,{a:'c'})

var str = qs.stringify(obj)
assert.equal(str,'a=c')
