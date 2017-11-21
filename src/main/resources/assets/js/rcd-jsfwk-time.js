function toLocalDateTimeFormat(date = new Date(), dateSeparator = '-', timeSeparator = ':') {
    return "" + toLocalDateFormat(date, dateSeparator) + 'T' +
           toLocalTimeFormat(date, timeSeparator);
}

function toLocalDateFormat(date = new Date(), dateSeparator = '-') {
    return "" + date.getFullYear() + dateSeparator +
           toDoubleDigitFormat(date.getMonth() + 1) + dateSeparator +
           toDoubleDigitFormat(date.getDate());
}

function toLocalTimeFormat(date = new Date(), timeSeparator = ':') {
    return "" + toDoubleDigitFormat(date.getHours()) + timeSeparator +
           toDoubleDigitFormat(date.getMinutes()) + timeSeparator +
           toDoubleDigitFormat(date.getSeconds());
}

function toDoubleDigitFormat(number) {
    return pad(number, 2, '0');
}

function pad(number, characterCount, paddingCharacter) {
    let result = "" + number;
    while (result.length < characterCount) {
        result = paddingCharacter + result;
    }
    return result;
}