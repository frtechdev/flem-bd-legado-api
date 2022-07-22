/**
 * Máscara de CPF. Converte String no formato "12345678900" para o CPF
 * nacional ("123.456.789-00").
 * @param {String} cpf String contendo o CPF ou um array de CPFs
 * @returns CPF ou array de CPFs devidamente formatado.
 */
 export const maskCPF = (cpf) => {
  if (Array.isArray(cpf)) {
    const output = cpf.map((item) => {
      return formatCPF(item);
    });
    return output;
  } else {
    return formatCPF(cpf);
  }
};

/**
 * Máscara reversa de CPF. Converte String no formato "123.456.789-00" para o
 * formato sem caracteres especiais ("12345678900").
 * @param {String} cpf String contendo o CPF ou um array de CPFs
 * @returns CPF ou array de CPFs sem formatação
 */
export const unmaskCPF = (cpf) => {
  if (Array.isArray(cpf)) {
    const output = cpf.map((item) => {
      return item.replaceAll(".", "").replaceAll("-", "");
    });
    return output;
  } else {
    return cpf.replaceAll(".", "").replaceAll("-", "");
  }
};

/**
 * Máscara de capitalização de nome, convertendo uma String no formato "JOAO DA SILVA"
 * ou "joao da silva" em "Joao da Silva".
 * Utiliza uma lista de exceções que pode ser modificada, compreendendo todos os pronomes
 * comuns ou trechos que não devem ser capitalizados.
 * @param {String} string Objeto tipo String contendo o texto a ser capitalizado 
 * @returns String devidamente formatada
 */
export const maskCapitalize = (string) => {
  const exceptions = [
    "do",
    "da",
    "de",
    "dos",
    "das",
    "em",
    "na",
    "no",
    "nas",
    "nos",
    "e",
    "a",
    "o",
  ];
  if (string && string.match("[a-zA-Z]")) {
    const strInput = string.toLowerCase().split(" ");
    const strCheckExceptions = strInput.map((str) => {
      for (let i = 0; i < exceptions.length; i++) {
        if (str === exceptions[i]) {
          return str;
        }
      }
      return str.toString().charAt(0).toUpperCase() + str.substring(1);
    });
    const strOutput = strCheckExceptions.join(" ");
    return strOutput;
  } else {
    return "";
  }
};

/**
 * Máscara de Data que converte um objeto Date sem locale em uma String
 * contendo o valor da data.
 * @param {Date} date Um Objeto Date de uma data/hora.
 * @returns Data no formato String.
 */
export const maskDate = (date) => {
  date = date.toString();
  if (date.includes("T")) {
    date = date.split("-");
    const daySegment = date[2].substring(0, 2);
    date = `${daySegment}/${date[1]}/${date[0]}`;
  } else if (date.includes("/")) {
    const segments = date.split("/");
    segments.forEach((segment) => {
      if (segment.toString().length === 1) {
        segments[segments.indexOf(segment)] = `0${segment}`;
      }
    });
    date = segments.join("/");
  } else {
    date = null;
  }
  return date;
};

/**
 * Converte String para String com caracteres especiais no formato do
 * CPF nacional ("123.456.789-00").
 * @param {String} cpf String contendo CPF.
 * @returns String formatada.
 */
function formatCPF(cpf) {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
