
import Vue from '../../vue.esm.browser.js';
import { BodyTemplate } from '../../helpers.js';

Vue.component('tabela-dinamica', {
    props: [
        'hidden',
        'mapa',
        'contador_linhas',
        'botao_exclusao',
        'exibir_colunas',
        'ocultar_colunas'
    ],
    data: function () {
        return {
            dados: []
        }
    },
    methods: {
        excluir_dado,
        header,
        body,
        footer
    },
    computed: {

        exibir_botao_exclusao,
        exibir_contador,
        json_dados,
        possui_acoes,
        possui_dados,
        possui_totalizadores,
        propriedades,
        propriedades_originais,
        propriedades_totalizadas
    },
    created,
    template: `
        <div>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th v-if="exibir_contador && possui_dados">#</th>
                        <th v-for="propriedade in propriedades">
                            {{ header(propriedade) }}
                        </th>
                        <th v-if="possui_acoes && possui_dados">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(dado, index) in dados">
                        <th v-if="exibir_contador">{{ index + 1 }}</th>
                        <td v-for="propriedade in propriedades">
                            {{ body(dado, propriedade) }}
                        </td>
                        <td v-if="possui_acoes && possui_dados">
                            <button class="btn" @click="excluir_dado" :data-index="index" v-if="exibir_botao_exclusao">
                                <i class="far fa-trash-alt" :data-index="index"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tfoot v-if="possui_totalizadores">
                    <tr>
                        <td v-if="exibir_contador"></td>
                        <template v-for="propriedade in propriedades">
                            <td v-if="propriedades_totalizadas.includes(propriedade)">
                                {{ footer(propriedade) }}
                            </td>
                            <td v-if="!propriedades_totalizadas.includes(propriedade)">
                            </td>
                        </template>
                        <td v-if="possui_acoes && possui_dados"></td>
                    </tr>
                </tfoot>
            </table>
            <slot v-bind:json_dados="json_dados"></slot>
        </div>
    `
});


function created() {

    // Caso o hidden tenha sido indicado.
    if (this.hidden) {

        const dados_persistidos = document.querySelector(this.hidden).value;

        // Caso o hidden possua dados.
        if (dados_persistidos) {

            this.dados = JSON.parse(dados_persistidos);
        }
    }
}

function excluir_dado(e) {

    if (confirm('Deseja realmente excluir a linha?')) {

        const index = e.target.getAttribute('data-index');
        this.dados.splice(index, 1);
        this.$emit('dado-alterado', this.json_dados);
    }
}

function exibir_botao_exclusao() {

    if (this.botao_exclusao != undefined) {

        return eval(this.botao_exclusao);
    }
    return true;
}

function exibir_contador() {

    if (this.contador_linhas != undefined) {

        return eval(this.contador_linhas);
    }
    return true;
}

function json_dados() {

    return JSON.stringify(this.dados);
}

function possui_acoes() {

    return this.exibir_botao_exclusao;
}

function possui_dados() {

    return this.dados.length > 0;
}

function possui_totalizadores() {

    return this.propriedades_totalizadas.length > 0;
}

function propriedades() {

    const propriedades_novas = Object.keys(this.mapa).filter(key => this.possui_dados && !this.propriedades_originais.includes(key));
    let propriedades = this.propriedades_originais.concat(propriedades_novas);

    if (this.exibir_colunas) {

        propriedades = propriedades.filter(prop => this.exibir_colunas.includes(prop));
    }

    if (this.ocultar_colunas) {

        propriedades = propriedades.filter(prop => !this.ocultar_colunas.includes(prop));
    }

    return propriedades;
}

function propriedades_originais() {

    return Array.from(new Set(this.dados.flatMap(dado => Object.keys(dado))));
}

function propriedades_totalizadas() {

    return Object.keys(this.mapa).filter(prop => this.mapa[prop].totalizar);
}

function header(prop) {

    if (this.mapa) {

        if (Object.keys(this.mapa).includes(prop)) {

            if (this.mapa[prop].header) {

                return this.mapa[prop].header;
            }
        }
    }
    return prop;
}

function body(dado, prop) {

    // Verifica se existe um mapa com informações customizadas para as propriedades.
    if (this.mapa) {

        // Caso exista o mapa, verifica se a propriedade em questão possui definições nele.
        if (Object.keys(this.mapa).includes(prop)) {

            // Caso a propriedade tenha uma função body definida, utiliza essa função para transformar o dado.
            // A função body tem prioridade sobre a propriedade template, por isso é executada primeiro.
            if (this.mapa[prop].body) {

                return this.mapa[prop].body(dado)
            }

            // Caso tenha um template definido para a propriedade, utiliza para transformar o dado.
            if (this.mapa[prop].template) {

                const template_name = this.mapa[prop].template;
                return BodyTemplate[template_name](dado[prop]);
            }
        }
    }
    return dado[prop];
}

function footer(prop) {

    let dado_totalizado;

    if (this.propriedades_originais.includes(prop)) {

        dado_totalizado = this.dados.reduce((total, dado) => total += dado[prop], 0.0);
    }
    else {

        dado_totalizado = this.dados.reduce((total, dado) => total += this.mapa[prop].body(dado), 0.0);
    }

    if (this.mapa[prop].template) {

        const template_name = this.mapa[prop].template;
        return BodyTemplate[template_name](dado_totalizado);
    }

    return dado_totalizado;
}