import { prisma } from "services/prisma";

/**
 * Lista todas as vagas no BD.
 * @returns Objeto JSON contendo o retorno da consulta.
 */
export async function getVagas() {
  const queryLimit = 4000;
  return await prisma.vaga.findMany({ take: queryLimit });
}


/**
 * Lista todas as vagas baseado no critério de
 * pesquisa.
 * @param {Object} filter Array de Objetos contendo os parâmetros
 * de busca.
 * @returns Objeto JSON contendo o retorno da consulta.
 */
export async function getVagasByFilter(filter){
  return await prisma.vaga.findMany({
    include: {
      Situacao: true,
    },
    where: {
      ...filter,
    },
  });
}
