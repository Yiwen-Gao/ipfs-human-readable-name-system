import { getCIDForDomainName } from './ipfs';

function handleSearchRequest(details: chrome.webRequest.WebRequestBodyDetails): chrome.webRequest.BlockingResponse {
    let url = details.url;
    const parser = new URL(url);
    const query = parser.searchParams.get('q');

    const matches = query && /ipfs:\/\/[a-zA-Z]{3,}/.exec(query);
    if (matches && matches.length == 1) {
        const cid = getCIDForDomainName(matches[0]);
        url = `https://ipfs.io/ipfs/${cid}`;
    }
    console.log('url', url);

    return {'redirectUrl': url};
}

chrome.webRequest.onBeforeRequest.addListener(
    handleSearchRequest,
    {
        'urls': ['https://*.google.com/search*'],
    },
    ['blocking'],
);


