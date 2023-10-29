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
  return currencySymbol + value.toFixed(5).replace(".", ",");
}

export function currencyFormat(value) {
  if (isNaN(value)) return "";
  return value.toFixed(5).replace(".", ",");
}

export function currency_percentual(value, currencySymbol = "%") {
  if (isNaN(value)) return "";
  return value.toFixed(5).replace(".", ",") + currencySymbol;
}
export function currency_percentual_decimal2(value, currencySymbol = " %") {
  if (isNaN(value)) return "";
  return value.toFixed(2).replace(".", ",") + currencySymbol;
}

export function Min(value, currencySymbol = " minutos") {
  if (isNaN(value)) return "";
  return value + currencySymbol;
}

export function formatarDataParaPtBR(data) {
  const partesData = data.split("-");
  if (partesData.length !== 3) {
    throw new Error("Formato de data inválido. Use o formato dd/mm/aaaa.");
  }

  const ano = partesData[0];
  const mes = partesData[1];
  const dia = partesData[2];

  return `${dia}/${mes}/${ano}`;
}

export function formatarHorarioAgenda(hora) {
  const partesData = hora.split(":");
  if (partesData.length !== 3) {
    throw new Error("Formato de Horario inválido. Use o formato 00:00:00.");
  }

  const horario = partesData[0];
  const min = partesData[1];

  return `${horario}:${min}`;
}

export function inverterDataPtBR(data) {
  const partesData = data.split("/");
  if (partesData.length !== 3) {
    throw new Error("Formato de data inválido. Use o formato dd/mm/aaaa.");
  }

  const dia = partesData[0];
  const mes = partesData[1];
  const ano = partesData[2];

  return `${ano}-${mes}-${dia}`;
}

export function extrairNumero(str) {
  const regex = /(\d+,\d+)/; // Expressão regular para encontrar números no formato X,Y
  const match = str.match(regex); // Procura por correspondências na string
  if (match) {
    const numeroFormatado = match[0]; // Obtém o número formatado (exemplo: 50,75)
    const numero = parseFloat(numeroFormatado.replace(",", ".")); // Converte para um número JavaScript (substitui ',' por '.' e converte)
    return numero;
  } else {
    return null; // Retorna null se não encontrar nenhum número correspondente
  }
}

export function formatarData(dataString) {
  const data = new Date(dataString);

  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear().toString();

  return `${ano}-${mes}-${dia}`;
}

export function currency_t(value, currencySymbol = "R$ ") {
  if (isNaN(value)) return "";
  return currencySymbol + value.toFixed(2).replace(".", ",");
}
