it('sem testes,ainda ',()=>{})

// const getSomething = callback => { //funçãoc com parametro 
//     setTimeout(() => {
//         callback(12); //função para tornar as coisas async
//     }, 1000);
// }

// const system = () => {
//     console.log('init ');
//     getSomething(some => { //passo parametros para o parametro
//         console.log(`Alguma coisa é ${some}`);
//         console.log('end');
//     });
// }

// system();


// como a forma antiga pode causar problemas de gerar uma estrutura muito grande.
const getSomething = () => { //funçãoc com parametro 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(12); //função para tornar as coisas async
        }, 1000);
    });
}

const system = () => {
    console.log('init ');
    getSomething().then(some => { //passo parametros para o parametro
        console.log(`Alguma coisa é ${some}`);
        console.log('end');
    });
}
/**
 *  Caso legal, mas nao recomendado para o cyypress
 */
// const system = async () => {
//     console.log('init ');
//     const some = await getSomething() //passo parametros para o parametro
//     console.log(`Alguma coisa é ${some}`);
//     console.log('end');
// }

system();