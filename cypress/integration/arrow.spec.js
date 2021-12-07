it('Nada ainda',() => {

})

// const soma = (a,b) => a+b QUANDO TEM MAIS PARAMETRO 

// const soma = (a) => a+a; 

// const soma = a => a+a  QUANDO HÁ 1 PARAMETRO


console.log(soma(1,2))

it('A function test', function() {
    console.log('function',this)
});

it('A arrow test',() => {
    console.log('arrow',this)
})