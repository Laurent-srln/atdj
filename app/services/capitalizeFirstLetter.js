const capitalizeFirstLetter = (text) => {

    var regex = new RegExp('(^|[- ])(\\w)', 'g');

    return text.replace(regex, function (match) {
        return match.toUpperCase();
    })
};

module.exports = capitalizeFirstLetter;