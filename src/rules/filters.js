export function formataDataTempo(d) {
  if (!d) return "";
  d = d.split(" ");
  let data = d[0];
  let tempo = d[1];
  // //formatando a data
  data = data.split("-");
  data = data[2] + "/" + data[1] + "/" + data[0];
  // //formatar o tempo
  tempo = tempo.split(".");
  tempo = tempo[0];
  return data + " - " + tempo;
}

export function currency(value, currencySymbol = "R$ ") {
  if (isNaN(value)) return "";
  return currencySymbol + value.toFixed(2).replace(".", ",");
}

export function Min(value, currencySymbol = " minutos") {
  if (isNaN(value)) return "";
  return value + currencySymbol;
}

export function formatarDataParaPtBR(data) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Intl.DateTimeFormat("pt-BR", options).format(new Date(data));
}

export function inverterDataPtBR(data) {
  const partesData = data.split('/');
  if (partesData.length !== 3) {
    throw new Error('Formato de data inválido. Use o formato dd/mm/aaaa.');
  }

  const dia = partesData[0];
  const mes = partesData[1];
  const ano = partesData[2];

  return `${ano}-${mes}-${dia}`;
}
