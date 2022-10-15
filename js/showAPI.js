
/********* Métodos - Limpeza e preenchimento do formulário ************/
const limparForm = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherForm = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

//validação do CEP com expressão regular
//validação dos números
const eNumero = (numero) => /^[0-9]+$/.test(numero)
//validação do tamanho
const cepValido = (cep) => cep.length == 8 && eNumero(cep)

/************** Método que usa a API ****************/
const pesquisarCep = async () => {
    limparForm()

    const cep = document.getElementById('cep').value
    const url = `https://viacep.com.br/ws/${cep}/json`

    //Validação do formato do cep
    if(cepValido(cep)){
        const dados = await fetch(url) //Receber uma API
        const endereco = await dados.json() // Saber o tipo que esta sendo recebido
    
        //É um cep existente?
        if(endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').innerHTML = 'CEP não encontrado'
        } else {
            preencherForm(endereco)
        }
    } else{
        document.getElementById('endereco').value = 'Formato de CEP incorreto'
    }
}

/********* INTERAÇÃO COM O DOM *********/
document.getElementById('cep').addEventListener('focusout', pesquisarCep)