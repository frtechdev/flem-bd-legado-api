export const maskCPF = (cpf) => {
  if (Array.isArray(cpf)) {
    const output = cpf.map((item) => {
      return formatCPF(item);
    });
    return output;
  } else {
    return JSON.stringify(formatCPF(cpf));
  }
};

function formatCPF(cpf) {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
