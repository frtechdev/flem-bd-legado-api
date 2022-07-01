import { maskCPF } from "utils/masks/maskCPF";
import { prisma } from "utils/prisma";

const handler = async (req, res) => {
  const { entity, nome, matriculaFlem, matriculaSec, cpf } = req.query;
  try {
    if (nome) {
      const query = await prisma.egresso.findMany({
        where: {
          nome: {
            in: JSON.parse(nome),
          },
        },
      });
      return res.status(200).json({ status: "ok", query });
    } else if (matriculaFlem) {
      const query = await prisma.egresso.findMany({
        where: {
          matriculaFlem: {
            in: JSON.parse(matriculaFlem),
          },
        },
      });
      return res.status(200).json({ status: "ok", query });
    } else if (matriculaSec) {
      if(entity === "ba"){
        const query = await prisma.egresso.findMany({
          where: {
            matriculaSAEB: {
              in: JSON.parse(matriculaSec),
            },
          },
        });
        return res.status(200).json({ status: "ok", query });
      }
    } else if (cpf) {
      const query = await prisma.egresso.findMany({
        where: {
          cpf: {
            in: maskCPF(JSON.parse(cpf)),
          },
        },
      });
      return res.status(200).json({ status: "ok", query });
    } else {
      const query = await prisma.egresso.findMany();
      return res.status(200).json({ status: "ok", query });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default handler;
