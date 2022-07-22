import { prisma } from "services/prisma";

/**
 * Lista todas as situações no BD.
 * @returns Objeto JSON contendo o retorno da consulta.
 */
export async function getSituacoes() {
  const queryLimit = undefined;
  return await prisma.situacao.findMany({ take: queryLimit });
}

/**
 * Lista todas as situações baseado no critério de
 * pesquisa.
 * @param {Object} filter Array de Objetos contendo os parâmetros
 * de busca.
 * @returns Objeto JSON contendo o retorno da consulta.
 */
export async function getSituacoesByFilter(filter){
  return await prisma.situacao.findMany({
    include: {
      Vaga: true,
    },
    where: {
      ...filter,
    },
  });
}