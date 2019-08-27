
import Vue from './vue.esm.browser.js';
import { TabelaDinamica } from './components/tabeladinamica/TabelaDinamica.js';


const data = {
    pessoas: {
        fields: {
            nome: {
                title: '<i class="far fa-user"></i> Nome'
            },
            nascimento: {
                title: '<i class="fas fa-baby"></i> Data de Nascimento',
                formatter: 'data'
            },
            saldo_conta: {
                title: '<i class="fas fa-dollar-sign"></i> Saldo em Conta',
                formatter: 'moeda',
                totalize: true
            },
            dias_vivo: {
                title: '<i class="far fa-heart"></i> Nº Dias Vividos',
                data: data => Math.round((new Date() - new Date(data.nascimento)) / (1000 * 60 * 60 * 24))
            }
        }
    }
}

window.app = new Vue({
    el: '#app',
    data,
    components: {
        'tabela-dinamica': TabelaDinamica
    },
    methods: {
        adicionarPessoa
    }
});

function adicionarPessoa() {

    const pessoa = criarObjetoPessoa();

    // Chama o método dentro do componente filho que adiciona o objeto à lista.
    this.$refs.tdNomes.adicionar_dado(pessoa);
}

function criarObjetoPessoa(){

    // Captura os dados contidos no formulário.
    const input_nome = document.querySelector('#nome');
    const input_nascimento = document.querySelector('#nascimento');
    const input_saldo = document.querySelector('#saldo_conta');

    // Cria e retorna o objeto que representa a pessoa.
    return {
        nome: input_nome.value,
        nascimento: new Date(`${input_nascimento.value}T00:00:00`),
        saldo_conta: parseFloat(input_saldo.value)
    };
}
