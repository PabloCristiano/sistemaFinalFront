const Rules = {
  // ValidarUrl(url) {
  //   if (url.length > 0) {
  //     return url = /^(http|https):\/\/([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/.test(url);
  //   }
  //   return true;
  // },
  ValidarCpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0,
      resto;
    for (let i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
  },
  ValidarCnpj(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, "");
    // verificando se tem a quantidade certa de caracter e se não tem todos caracteres iguais
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
    let t = cnpj.length - 2,
      d = cnpj.substring(t),
      d1 = parseInt(d.charAt(0)),
      d2 = parseInt(d.charAt(1)),
      calc = (x) => {
        let n = cnpj.substring(0, x),
          y = x - 7,
          s = 0,
          r = 0;
        for (let i = x; i >= 1; i--) {
          s += n.charAt(x - i) * y--;
          if (y < 2) y = 9;
        }
        r = 11 - (s % 11);
        return r > 9 ? 0 : r;
      };
    return calc(t) === d1 && calc(t + 1) === d2;
  },
  validarMaioridade(dataNascimento) {
    // Converte a data de nascimento em um objeto Date
    var dataNascimentoObj = new Date(dataNascimento);

    // Calcula a idade a partir da data de nascimento
    var hoje = new Date();
    var idade = hoje.getFullYear() - dataNascimentoObj.getFullYear();
    var mes = hoje.getMonth() - dataNascimentoObj.getMonth();
    if (
      mes < 0 ||
      (mes === 0 && hoje.getDate() < dataNascimentoObj.getDate())
    ) {
      idade--;
    }
    // Verifica se a idade é maior ou igual a 18 anos
    return idade >= 18;
  },
  isPositiveNumber(value) {
    // Verifica se o valor é numérico
    if (isNaN(value)) {
      return false;
    }

    // Verifica se o valor é maior que zero
    if (parseFloat(value) <= 0) {
      return false;
    }

    // Se passou pelas duas condições, o valor é positivo e maior que zero
    return true;
  },
  isNumber(value) {
    // Verifica se o valor é numérico
    if (isNaN(value)) {
      return false;
    }

    // Verifica se o valor é maior que zero
    if (parseFloat(value) < 0) {
      return false;
    }

    // Se passou pelas duas condições, o valor é positivo e maior que zero
    return true;
  },

  validardataEmissao(data) {
    const meses = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    const dataEmissao = Rules.convertToMilliseconds(data);

    const dataAtual = new Date();
    const diaAtual = dataAtual.getDate();
    const mesAtual = parseInt(meses[dataAtual.getMonth()]);
    const anoAtual = dataAtual.getFullYear();
    const dataAtual_convertida = `${anoAtual}-${mesAtual}-${diaAtual}`;
    const dataAtualV = Rules.convertToMilliseconds(dataAtual_convertida);
    if (dataEmissao <= dataAtualV) {
      return true; // Data é anterior ou igual à data atual
    } else {
      return false; // Data é posterior à data atual
    }
  },

  validarDataEmissao(data, dataEmissao) {
    const dataInserida = Rules.convertToMilliseconds(data);
    const dataEmissaoDate = Rules.convertToMilliseconds(dataEmissao);

    if (dataInserida >= dataEmissaoDate) {
      return true; // Data é posterior ou igual à data de emissão
    } else {
      return false; // Data é anterior à data de emissão
    }
  },
  convertToMilliseconds(dateString) {
    const dateParts = dateString.split("-");
    if (dateParts.length !== 3) {
      throw new Error("Formato de data inválido. Use YYYY-MM-DD.");
    }

    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Meses em JavaScript são indexados de 0 a 11
    const day = parseInt(dateParts[2], 10);

    const dateObject = new Date(year, month, day);
    const milliseconds = dateObject.getTime();

    return milliseconds;
  },
  validarHorario_Inicio(value) {
    const dataHoraAtual = new Date();
    const ano_ = dataHoraAtual.getFullYear();
    const mes_ = String(dataHoraAtual.getMonth() + 1).padStart(2, "0");
    const dia_ = String(dataHoraAtual.getDate()).padStart(2, "0");
    var hora_ = String(dataHoraAtual.getHours()).padStart(2, "0");
    var minutos_ = String(dataHoraAtual.getMinutes()).padStart(2, "0");
    var _hora_ = parseInt(hora_);
    var _minutos_ = parseInt(minutos_);
    var milissegundos_ = (_hora_ * 60 + _minutos_) * 60 * 1000;
    const dataAtual_ = `${ano_}-${mes_}-${dia_}`;
    const dataAtual_milisegundos = Rules.convertToMilliseconds(dataAtual_);

    const partes = value.split("T");
    const horario_v = partes[1];
    const data_value = new Date(value);
    const ano_v = data_value.getFullYear();
    const mes_v = String(data_value.getMonth() + 1).padStart(2, "0");
    const dia_v = String(data_value.getDate()).padStart(2, "0");
    const dataAtual_v = `${ano_v}-${mes_v}-${dia_v}`;
    const data_v_milisegundos = Rules.convertToMilliseconds(dataAtual_v);
    if (horario_v) {
      const horario_partes = horario_v.split(":");
      const hora_v = parseInt(horario_partes[0], 10);
      const minutos_v = parseInt(horario_partes[1], 10);
      var milissegundos_v = (hora_v * 60 + minutos_v) * 60 * 1000;
    }

    if (
      data_v_milisegundos + milissegundos_v <
      dataAtual_milisegundos + milissegundos_
    ) {
      return false;
    } else {
      return true;
    }
  },
  validarHorario_Fim(horario_fim, horario_inicio) {
    const partes = horario_fim.split("T");
    const data_horario_fim = partes[1];
    const data_value = new Date(horario_fim);
    const ano_v = data_value.getFullYear();
    const mes_v = String(data_value.getMonth() + 1).padStart(2, "0");
    const dia_v = String(data_value.getDate()).padStart(2, "0");
    const dataHorario_fim = `${ano_v}-${mes_v}-${dia_v}`;
    const data_horario_fim_milisegundos =
      Rules.convertToMilliseconds(dataHorario_fim);
    if (data_horario_fim) {
      const horario_partes = data_horario_fim.split(":");
      const hora_v = parseInt(horario_partes[0], 10);
      const minutos_v = parseInt(horario_partes[1], 10);
      var milissegundos_horario_fim = (hora_v * 60 + minutos_v) * 60 * 1000;
    }

    const partes_inicio = horario_inicio.split("T");
    const horario_inicioo = partes_inicio[1];
    const data_horario_inicio = new Date(horario_inicio);
    const ano_horario_incio = data_horario_inicio.getFullYear();
    const mes_horario_incio = String(
      data_horario_inicio.getMonth() + 1
    ).padStart(2, "0");
    const dia_horario_incio = String(data_horario_inicio.getDate()).padStart(
      2,
      "0"
    );
    const dataHorario_Iinicio = `${ano_horario_incio}-${mes_horario_incio}-${dia_horario_incio}`;
    const data_horario_Inicio_milisegundos =
      Rules.convertToMilliseconds(dataHorario_Iinicio);
    if (horario_inicioo) {
      const horario_partes_inicio = horario_inicioo.split(":");
      const hora_inicio = parseInt(horario_partes_inicio[0], 10);
      const minutos_inicio = parseInt(horario_partes_inicio[1], 10);
      var milissegundos_horario_inicio =
        (hora_inicio * 60 + minutos_inicio) * 60 * 1000;
    }

    if (
      data_horario_fim_milisegundos + milissegundos_horario_fim <
      data_horario_Inicio_milisegundos + milissegundos_horario_inicio
    ) {
      return false;
    } else {
      return true;
    }
  },
  milissegundosParaData(milissegundos) {
    // Crie um objeto de data usando os milissegundos
    const data = new Date(milissegundos);

    // Use métodos do objeto Date para obter a data, mês, ano, etc.
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Mês começa em zero, então adicione 1
    const ano = data.getFullYear();
    const hora = data.getHours();
    const minuto = data.getMinutes();
    const segundo = data.getSeconds();

    // Formate a data como uma string no formato desejado (por exemplo, "dd/mm/aaaa hh:mm:ss")
    const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;

    return dataFormatada;
  },
  milissegundosParaDataFormatada(milissegundos) {
    // Crie um objeto de data usando os milissegundos
    const data = new Date(milissegundos);

    // Use métodos do objeto Date para obter o ano, mês e dia
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0"); // O mês começa em zero
    const dia = String(data.getDate()).padStart(2, "0");

    // Formate a data como uma string no formato 'yyyy-mm-dd'
    const dataFormatada = `${ano}-${mes}-${dia}`;

    return dataFormatada;
  },
  milissegundosParaDataFormatada_(milissegundos) {
    // Crie um objeto de data usando os milissegundos
    const data = new Date(milissegundos);

    // Use o método toLocaleString() com opções para formatar a data
    const opcoes = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    const dataFormatada = data.toLocaleString("en-US", opcoes);

    return dataFormatada;
  },
  converterDataParaDiaSemana(dataString) {
    const diasDaSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    // Crie um objeto de data a partir da string
    const data = new Date(dataString);

    // Obtenha o índice do dia da semana (0 a 6)
    const indiceDiaSemana = data.getDay();

    // Use o índice para obter o nome do dia da semana em pt-BR
    const diaSemana = diasDaSemana[indiceDiaSemana];

    return diaSemana;
  },
  horarioParaMilissegundos(horario) {
    //recebe  um formato 13:00:00 e converte em milisegundos
    const partes = (horario ?? "").split(":");
    const horas = parseInt(partes[0], 10);
    const minutos = parseInt(partes[1], 10);
    const segundos = parseInt(partes[2], 10);

    const milissegundosPorHora = 60 * 60 * 1000;
    const milissegundosPorMinuto = 60 * 1000;
    const milissegundosPorSegundo = 1000;

    const totalMilissegundos =
      horas * milissegundosPorHora +
      minutos * milissegundosPorMinuto +
      segundos * milissegundosPorSegundo;

    return totalMilissegundos;
  },
  milissegundosParaHorario(milissegundos) {
    //recebe  um formato  em milisegundos e convert em formata em hora 14:00:00
    // Calcula horas, minutos e segundos a partir dos milissegundos
    const segundosTotais = Math.floor(milissegundos / 1000);
    const horas = Math.floor(segundosTotais / 3600);
    const minutos = Math.floor((segundosTotais % 3600) / 60);
    const segundos = segundosTotais % 60;

    // Formata os valores em uma string no formato hh:mm:ss
    const horarioFormatado = `${String(horas).padStart(2, "0")}:${String(
      minutos
    ).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

    return horarioFormatado;
  },
  milissegundosParaMinutos(milissegundos) {
    //Pega Milisegundos e converte em minutos
    const minutos = Math.floor(milissegundos / 60000); // 1 minuto = 60.000 milissegundos
    return minutos;
  },
  minutosParaMilissegundos(minutos) {
    const milissegundos = minutos * 60000; // 1 minuto = 60.000 milissegundos
    return milissegundos;
  },
  converterData(dataString) {
    // converte a ( Quarta-feira, 27/09/2023 )  em data (2023-09-27)

    // Mapeia os nomes dos dias da semana para números
    // const diasSemana = {
    //   Domingo: 0,
    //   "Segunda-feira": 1,
    //   "Terça-feira": 2,
    //   "Quarta-feira": 3,
    //   "Quinta-feira": 4,
    //   "Sexta-feira": 5,
    //   Sábado: 6
    // };

    // Divide a string em partes
    const partes = dataString.split(", ");

    // Extrai o dia da semana e a data
    // const diaSemana = partes[0];
    const data = partes[1];

    // Divide a data em dia, mês e ano
    const [dia, mes, ano] = data.split("/");

    // // Formata o dia da semana como número de 0 a 6
    // const numeroDiaSemana = diasSemana[diaSemana];

    // Formata a data no formato desejado
    const dataFormatada = `${ano}-${mes}-${dia}`;

    return dataFormatada;
  },
};
export default Rules;
