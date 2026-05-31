
const numeros = [1,2,3,4,5,6,7,8,9,10]
const [um, dois, tres, ...resto] = numeros
console.log(um, dois, tres)
console.log(resto)



const numeros2 = [
    [1,2,3], //0 [0, 1, 2]
    [4,5,6], //1 [0. 1, 2]
    [7,8,9]  //2 [0, 1, 2]
]
const [lista1, lista2, lista3] = numeros2
console.log(lista1[2], lista2[1], lista3[0])


const pessoa = {
    nome: 'Luiz',
    sobrenome: 'Otávio',
    idade: 20,
    endereco: {
        rua: 'Av Brasil',
        numero: 123
    }
}
const {nome, sobrenome, idade, endereco: {rua, numero}} = pessoa
console.log(nome, sobrenome, idade, rua, numero)

const nome2 = pessoa.nome
const sobrenome2 = pessoa.sobrenome
const idade2 = pessoa.idade
const rua2 = pessoa.endereco.rua
const numero2 = pessoa.endereco.numero
console.log(nome2, sobrenome2, idade2, rua2, numero2)
