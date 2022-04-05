export class Pessoa {
    id?: number;
    nome?: string;
    endereco = new Endereco();
    ativo = true;
    contatos = new Array<Contato>();
}

export class Endereco {
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cep?: string;
    cidade?: string;
    estado?: string;
}

export class Categoria {
    id?: number;
    nome?: string;
}

export class Lancamento {
    id?: number;
    tipo = 'RECEITA';
    descricao?: string;
    dataVencimento?: Date;
    dataPagamento?: Date;
    valor?: number;
    observacao?: string;
    pessoa = new Pessoa();
    categoria = new Categoria();
}

export class Seguranca {
    email?: string;
    senha?: string
}

export class Contato {
    id?: number;
    nome?: string;
    email?: string;
    telefone?: string;
}
