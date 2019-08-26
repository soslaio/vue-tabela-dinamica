
export class Projeto {

    constructor(codigo, nome){
        this.codigo = codigo;
        this.nome = nome;
    }
}

export class Acao {

    constructor(codigo, nome){
        this.codigo = codigo;
        this.nome = nome;
    }
}

export class Unidade {

    constructor(codigo, nome){
        this.codigo = codigo;
        this.nome = nome;
    }
}

export class Dotacao {

    constructor(projeto, acao, unidade, percentual, inicio_vigencia, fim_vigencia, valor){
        this.id = Math.random();
        this.projeto = projeto;
        this.acao = acao;
        this.unidade = unidade;
        this.percentual = percentual;
        this.inicio_vigencia = inicio_vigencia;
        this.fim_vigencia = fim_vigencia;
        this.valor = valor;
    }
}
