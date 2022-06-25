const { v4: uuid } = require('uuid')

const tokens = []

// Llenar arreglo de tokens con uuid
for (let i = 1; i < 10_000_000; i++) {
    tokens.push(uuid())
}

const hashmap = new Map()

// Contar duplicados
for (let token of tokens) {
    if (hashmap[token] === undefined) {
        hashmap[token] = 1
    } else {
        hashmap[token]++
    }
}

// Mostrar duplicados
for (let key in hashmap) {
    if (hashmap[key] > 1) {
        console.log(key)
    }
}
