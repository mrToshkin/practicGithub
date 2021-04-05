//учебный файл по node.js
require('./app/in2')

//lodash внешний подключенный модуль, он тут что-то делает:
const lod = require('lodash')
lod.assign({ 'a': 1 }, { 'b': 2 }, { 'c': 3 });
// -> { 'a': 1, 'b': 2, 'c': 3 }