const defaultHost = "http://localhost:8081/ApiColina";
const defaultHeaders = new Headers({
    "Content-Type": "application/json",
    "Accept": "*/*"
});

function normalizeUrl(url) {
    if (url[0] == '/') {
        url = url.substring(1);
    }
    return url;
}

function concatQueryParams(queryParams) {
    queryParams = Object.entries(queryParams);
    console.log(queryParams);
    let concatString = "?";
    for(let [key, value] of queryParams) {
        if(value !== null && value !== '') {
            concatString += key + "=" + value + "&";
        }
    }
    return concatString;
} 


// async function doGet(string, object) -> void
async function doGet(url, queryParams = {}) {
    const init = {
        method: "GET",
        headers: defaultHeaders,
    };

    url = normalizeUrl(url);
    let size = Object.keys(queryParams).length;
    queryParams = size > 0 ? concatQueryParams(queryParams) : "";

    return fetch(`${defaultHost}/${url}${queryParams}`, init)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erro ao realizar busca.");
                    }
                    return response.json();
                });
}

export {doGet};