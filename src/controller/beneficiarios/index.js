import { maskCPF } from "utils/masks";
import { prisma } from "services/prisma";

/**
 * Lista todos os beneficiários no BD.
 * @returns Objeto JSON contendo o retorno da consulta.
 */
export async function getBenef() {
  const queryLimit = 1350;
  return await prisma.egresso.findMany({ take: queryLimit });
}

/**
 * Lista todos os beneficiários baseado no critério de
 * pesquisa.
 * @param {Object} filter Array de Objetos contendo os parâmetros
 * de busca.
 * @returns Objeto JSON contendo o retorno da consulta.
 */
export async function getBenefByFilter(filter){
  return await prisma.egresso.findMany({
    include: {
      Vaga: {
        include: {
          Situacao: true,
        },
      },
    },
    where: {
      ...filter,
    },
  });
}
