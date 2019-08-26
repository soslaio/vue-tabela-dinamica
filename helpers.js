
export class BodyTemplate {

    static slug(valor) {

        return valor.toLowerCase().replace(/\s/g, '-');
    }

    static percentual(valor) {

        return `${BodyTemplate.numero(valor)} %`;
    }

    static moeda(valor) {

        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    static numero(valor) {

        return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    static data(valor) {

        // Corrige o tipo do dado, caso necessário.
        if (typeof valor == 'string') valor = new Date(valor);

        return valor.toLocaleDateString('pt-BR');
    }

    static periodo(inicio, fim) {

        // Garante que o tipo das variáveis de início e fim são datetime.
        if (typeof inicio == 'string') inicio = new Date(inicio);
        if (typeof fim == 'string') fim = new Date(fim);

        const inicio_formatado = BodyTemplate.data(inicio);
        const fim_formatado = BodyTemplate.data(fim);

        if (inicio.getFullYear() == fim.getFullYear())
            if (inicio.getMonth() == fim.getMonth())
                return `${inicio_formatado.split('/')[0]} a ${fim_formatado}`;
            else
                return `${inicio_formatado.split('/').slice(0, 2).join('/')} a ${fim_formatado}`;
        else
            return `${inicio_formatado} a ${fim_formatado}`;
    }
}
