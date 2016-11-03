function toLocalDateTimeFormat(date, dateSeparator = '-', timeSeparator = ':') {
    return "" + date.getFullYear() + dateSeparator +
           toDoubleDigitFormat(date.getMonth() + 1) + dateSeparator +
           toDoubleDigitFormat(date.getDate()) + 'T' +
           toDoubleDigitFormat(date.getHours()) + timeSeparator +
           toDoubleDigitFormat(date.getMinutes()) + timeSeparator +
           toDoubleDigitFormat(date.getSeconds());
}

function toDoubleDigitFormat(number) {
    return pad(number, 2, '0');
}

function pad(number, characterCount, paddingCharacter) {
    var result = "" + number;
    while (result.length < characterCount) {
        result = paddingCharacter + result;
    }
    return result;
}