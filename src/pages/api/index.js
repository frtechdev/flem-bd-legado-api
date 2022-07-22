/**
 * Rota de redirecionamento para a documentação
 * do jsdoc. Altera o título do documento, visto que
 * a biblioteca jsdoc não possui suporte nativo para
 * esta função.
 * @param {Object} req HTTP request.
 * @param {Object} res HTTP response.
 */
export default async function api(req, res) {
  const fs = require("fs").promises;
  const docsIndex = "public/index.html";
  const docsTitle = "API de Banco de Dados Legado FLEM";
  const fileDocsIndex = await fs.readFile(docsIndex, "utf8");
  const formattedDocsIndex = fileDocsIndex.replace(/Home/g, docsTitle);
  await fs.writeFile(docsIndex, formattedDocsIndex, "utf-8");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write(formattedDocsIndex);
  res.end();
}
