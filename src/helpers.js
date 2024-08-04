export function sum(array) {
    return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export function getApiUrlWithFilterExtension(filterBy, filterValue) {

    const EXTENSION_MAP = {
        "any": "s",
        "title": "t"
    }

    const searchKey = EXTENSION_MAP[filterBy];
    const gateway = process.env.REACT_APP_OMDB_API_GATEWAY;
    const apiKey = process.env.REACT_APP_OMDB_API_KEY;

    return `${gateway}?${searchKey}=${filterValue}&apikey=${apiKey}`;
}
