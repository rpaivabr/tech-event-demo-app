import { FieldValidator } from "@angular/forms/signals";

export const cpfValidator: FieldValidator<string> = ({ value }) => {
  // Retorna nulo se o campo estiver vazio (deixa a validação de obrigatório para o 'required')
  const valorAtual = value();
  if (valorAtual.length < 11) {
    return null;
  }

  // Remove tudo o que não for dígito
  const cpf = String(valorAtual).replace(/\D/g, '');

  // Rejeita CPFs que não têm 11 dígitos ou possuem sequências repetidas (ex: 111.111.111-11)
  const isIncorrectStructure = cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf);

  if (isIncorrectStructure) {
    return {
      kind: 'cpf',
      message: 'CPF inválido',
    };
  }

  // Função para calcular o dígito verificador baseado no algoritmo de Módulo 11
  const calcularDigito = (limite: number): number => {
    let soma = 0;
    for (let i = 0; i < limite; i++) {
      soma += Number(cpf[i]) * (limite + 1 - i);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  // Calcula o 1º e o 2º dígitos verificadores
  const digito1 = calcularDigito(9);
  const digito2 = calcularDigito(10);

  // Valida se os dígitos calculados batem com os dígitos reais do CPF
  const isValid = digito1 === Number(cpf[9]) && digito2 === Number(cpf[10]);

  // Se NÃO for válido, retorna o objeto de erro
  if (!isValid) {
    return {
      kind: 'cpf',
      message: 'CPF inválido',
    };
  }

  // CPF válido
  return null;
};