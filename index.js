
import Vue from './vue.esm.browser.js';
import { BodyTemplate } from './helpers.js'
import './components/tabeladinamica/TabelaDinamica.js';


window.app = new Vue({
    el: '#app',
    data: {
        pessoas:{
            fields: {
                nome: {
                    title: '<i class="far fa-user"></i> Nome'
                },
                nascimento: {
                    title: '<i class="fas fa-baby"></i> Data de Nascimento',
                    formatter: 'data'
                },
                saldo_conta: {
                    title: '<i class="fas fa-dollar-sign"></i> Saldo em conta',
                    formatter: 'moeda',
                    totalize: true
                },
                dias_vivo: {
                    title: '<i class="far fa-heart"></i> Nº de dias vivo',
                    data: data => Math.round((new Date() - new Date(data.nascimento)) / (1000 * 60 * 60 * 24)),
                    totalize: true
                }
            },
        },
        dotacoes: {
            fields: {
                id: {
                    visible: false
                },
                projeto: {
                    title: 'Projeto',
                    data: row => row.projeto.nome
                },
                acao: {
                    title: 'Ação',
                    data: row => row.acao.nome
                },
                unidade: {
                    title: 'Unidade',
                    data: row => row.unidade.nome
                },
                percentual: {
                    title: '%',
                    formatter: 'percentual',
                    totalize: true
                },
                valor: {
                    title: 'Valor',
                    formatter: 'moeda',
                    totalize: true
                },
                periodo: {
                    title: 'Período',
                    data: row => BodyTemplate.periodo(row.inicio_vigencia, row.fim_vigencia)
                }
            },
            // colunas_para_ocultar: ['id', 'inicio_vigencia', 'fim_vigencia'],
        }
    }
});
