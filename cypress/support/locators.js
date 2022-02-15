//EXEMPLO NÃO FUNCIONAL
// seria interessante dividir os objetos por tela ou funcionalidade
const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-tets=passwd]',
        BUTTON: '.btn'
    },
    FUNCTION_EXEMPLO : (nome) => `[data-test=${nome}]` //referencia a ela como uma função
}

export default locators; 