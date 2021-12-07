/// <reference types="cypress" />

it('Equality', () => {
    const a = 1;
    expect(a).to.be.equal(1) //não muda nada, mas a leitura fica mais legível 
    expect(a).not.to.be.equal('b');
    expect(a).not.equal('c');
    // expect(a, 'Deveria ser 1').equal(2)
  
});

it('Truthy', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.equal(true);
    expect(a).to.be.true;
    expect(a).true;
    // expect(a).false;

    expect(b).null;
    expect(b).to.be.null;
    expect(a).to.be.not.null;
    expect(c).to.be.undefined;

});

it('Object Equality', () => {
    const objeto = {
        a:1,
        b:2
    }

    expect(objeto).equal(objeto);
    expect(objeto).equals(objeto);
    expect(objeto).eq(objeto);
    expect(objeto).to.be.deep.equal({a:1, b:2}); //ou
    expect(objeto).eql({a:1, b:2}) 
    expect(objeto).include({a:1}) //verificar se dentro do objeto tem essa propridade
    expect(objeto).to.have.property('b'); // verificar se objeto tem determinada propriedade
    expect(objeto).to.have.property('b', 2); // verificar se objeto tem determinada propriedade e se p valor dela é 2
    expect(objeto).to.not.be.empty; //verificar se o objeto não está vazio
    expect({}).to.be.empty; //verificar se o objeto está vazio
    // expect(objeto).to.have.property('b', 1); // verificar se objeto tem determinada propriedade e se p valor dela é 1
});

it('Arrays', () => {
    const array = [1,2,3];
    expect(array).to.have.members([1,2,3]); // se for procurar se todos os membros passados existem
    expect(array).to.include.members([1,2,3]); // verificar se alguns membros passados existem
    expect(array).to.not.be.empty;
    expect([]).to.be.empty;
});

it('Types', () => {
    const num = 1;
    const str = 'string';

    expect(num).to.be.a('number');
    expect(str).to.be.a('string');
    expect({}).to.be.an('object');
    expect([]).to.be.an('array');
});

it('String', () => {
    const str = 'String de teste'

    expect(str).to.be.equal('String de teste');
    expect(str).to.have.length(15)
    expect(str).to.contains('de');
    expect(str).to.match(/de/) //deve conter "de"
    expect(str).to.match(/^String/) // deve iniciar com string
    expect(str).to.match(/teste$/) // deve finlaizar com teste
    expect(str).to.match(/.{15}/) // deve ter o valor de 15 caracteres
    expect(str).to.match(/\w+/) // deve conter apenas letras
    expect(str).to.match(/\D+/) // não deve conter númerosa
    
});

it('Numbers', () => {
    const number = 4;
    const floatNumber = 5.343434453

    expect(number).to.be.equal(4); // =
    expect(number).to.be.above(3); // >
    expect(number).to.be.below(5); // <
    expect(floatNumber).to.be.closeTo(5.3, 0.1); // próximo de tal número com uma precisão de 0.1

});