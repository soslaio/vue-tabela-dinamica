
import Vue from './vue.esm.browser.js';
import { BodyTemplate } from './helpers.js'
import './components/tabeladinamica/TabelaDinamica.js';


window.app = new Vue({
    el: '#app',
    data: {
        pessoas:{

            mapa: {
                nome: {
                    header: 'Nome'
                },
                nascimento: {
                    header: 'Data de Nascimento',
                    template: 'data'
                },
                saldo_conta: {
                    header: 'Saldo em conta',
                    template: 'moeda',
                    totalizar: true
                },
                dias_vivo: {
                    header: 'Nº de dias vivo',
                    body: data => Math.round((new Date() - new Date(data.nascimento)) / (1000 * 60 * 60 * 24)),
                    totalizar: true
                }
            },
        },
        dotacoes: {

            mapa: {
                id: {
                    ocultar: true
                },
                projeto: {
                    header: 'Projeto',
                    body: row => row.projeto.nome
                },
                acao: {
                    header: 'Ação',
                    body: row => row.acao.nome
                },
                unidade: {
                    header: 'Unidade',
                    body: row => row.unidade.nome
                },
                percentual: {
                    header: '%',
                    template: 'percentual',
                    totalizar: true
                },
                valor: {
                    header: 'Valor',
                    template: 'moeda',
                    totalizar: true
                },
                periodo: {
                    header: 'Período',
                    body: row => BodyTemplate.periodo(row.inicio_vigencia, row.fim_vigencia)
                }
            },
            colunas_para_ocultar: ['id', 'inicio_vigencia', 'fim_vigencia'],
        }
    }
});
