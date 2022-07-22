import { getSituacoes, getSituacoesByFilter } from "controller/situacoes";
import { allowCors } from "services/apiAllowCors";
import { parseArrayToInteger, parseArrayToString } from "utils/parsers";

/**
 * Função para compor o filtro da query. Caso a requisição faça uma solicitação
 * ao BD utilizando critérios de pesquisa ("condition") e um objeto de filtro,
 * aplica a alteração a um objeto de filtro para realizar a pesquisa corretamente.
 * @param {Object} req HTTP request.
 * @returns Objeto contendo os detalhes do filtro os quais incorporam e compõem a
 * query do Prisma.
 */
const composeFilter = (req) => {
  const { entity, condition, ...query } = req.query;
  const keys = Object.keys(query);
  const filter = {
    [condition]: [],
  };
  keys.forEach((key) => {
    switch (key) {
      case "id_situacao":
        filter[condition].push({
          [key]: { in: parseArrayToInteger(query[key]) },
        });
        break;
      default:
        filter[condition] = parseArrayToString(query[key], key);
        break;
    }
  });
  return filter;
};

/**
 * Fornece Situações e lista de Situações conforme critérios.
 * Recebe um request HTTP com os seguintes parâmetros:
 * entity - a entidade do Projeto (Bahia, Tocantins etc). É dinamicamente
 * atribuído pelo caminho da requisição à API.
 * condition - condição para determinar as opções da filtragem. É um parâmetro
 * mandatório na query string da requisição.
 * params - demais parâmetros não mencionados, os quais caem no critério de
 * filtragem dependendo das colunas da tabela requisitada pela query.
 * Requer ao menos "condition" (ex. condition=OR) e um objeto de filtro (ex. nome="Fulano")
 * para realizar a pesquisa com o BD.
 * @param {Object} req HTTP request. Apenas GET é aceito
 * @param {Object} res HTTP response
 * @returns HTTP response como JSON contendo a resposta da query consultada
 */
async function handler(req, res) {
  if (req.method === "GET") {
    // CONSTRÓI O FILTRO CONTENDO OS CRIÉRIOS DE PESQUISA
    const filter = composeFilter(req);
    const { entity, condition, ...params } = req.query;
    try {
      // SE NENHUM CRITÉRIO DE PESQUISA É INCLUÍDO, ELE RETORNA TODOS OS BENEFICIÁRIOS.
      if (Object.keys(params).length === 0) {
        const query = await getSituacoes();
        return res.status(200).json({ status: "ok", query });
      }
      /**
       * SE ALGUM CRITÉRIO É INCLUÍDO JUNTAMENTE COM A CONDIÇÃO DE PESQUISA, RETORNA
       * O RESULTADO DA QUERY FILTRADA.
       */
      if (Object.keys(filter[condition]).length > 0) {
        try {
          const query = await getSituacoesByFilter(filter);
          return res.status(200).json({ status: "ok", query });
        } catch (error) {
          // SE UM CRITÉRIO FOR INCLUÍDO MAS NÃO A CONDIÇÃO DE PESQUISA, RETORNA ERRO
          if (!condition) {
            return res
              .status(400)
              .json({
                status: 400,
                message: "ERRO DE API - A chamada requer 'CONDITION'.",
                error: error.message
              });
          }
          // SE A CONSULTA RESULTOU EM ERRO POR QUALQUER OUTRO MOTIVO
          return res
            .status(500)
            .json({ status: 500, message: "QUERY ERROR", error: error.message});
        }
      }
    } catch (error) {
      // SE FOI INSERIDA A CONDIÇÃO, MAS ELA ESTAVA INCORRETA, OU OS CRITÉRIOS DE PESQUISA NÃO BATEM
      return res
        .status(405)
        .json({ status: 405, message: "METHOD NOT ALLOWED", error: error.message });
    }
  } else {
    // SE FOI FEITO OUTRO MÉTODO ALÉM DE GET
    return res.status(403).json({ status: 403, message: "METHOD NOT ALLOWED" });
  }
}

export default allowCors(handler);
