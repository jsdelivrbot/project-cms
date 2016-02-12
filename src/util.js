export function getQueryParams(qs) {
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    if (!qs) return params;
    qs = qs.split('+').join(' ');

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}
