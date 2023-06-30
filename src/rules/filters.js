export function formataDataTempo(d) {
    if (!d) return ''
    d = d.split(' ')
    let data = d[0]
    let tempo = d[1]
    // //formatando a data
    data = data.split('-')
    data = data[2] + '/' + data[1] + '/' + data[0]
    // //formatar o tempo
    tempo = tempo.split('.')
    tempo = tempo[0]
    return data + ' - ' + tempo
}

export function currency(value, currencySymbol = 'R$ ') {
    if (isNaN(value)) return '';
    return currencySymbol + value.toFixed(2).replace('.', ',');
}

export function Min(value, currencySymbol = ' minutos') {
    if (isNaN(value)) return '';
    return  value+  currencySymbol ;
}
