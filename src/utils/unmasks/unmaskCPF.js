export const unmaskCPF = (cpf) => {
  if (Array.isArray(cpf)){
    const output = cpf.map((item) =>{
      return item.replaceAll(".", "").replaceAll("-", "");
    })
    return output;
  }
  else{
    return cpf.replaceAll(".", "").replaceAll("-", "");
  }
};
