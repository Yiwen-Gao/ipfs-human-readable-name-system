const ipfs = require('./ipfs');

function handleSearchRequest(details: chrome.webRequest.WebRequestBodyDetails): chrome.webRequest.BlockingResponse {
    let url = details.url;
    const parser = new URL(url);
    const query = parser.searchParams.get('q');

    const matches = query && /ipfs:\/\/([a-zA-Z]{3,})/.exec(query);
    // This is a hack to make async calls: https://stackoverflow.com/a/69134172/20253134.
    (async () => {
        if (matches && matches.length == 2) {
            const cid = await ipfs.getCIDForDomainName(matches[1]);
            console.log('cid', cid);
            if (cid) {
                url = `https://ipfs.io/ipfs/${cid}`;
                await chrome.tabs.update(details.tabId, {url: url});
            }
        }
    })();

    return {};
}

chrome.webRequest.onBeforeRequest.addListener(
    handleSearchRequest,
    {
        'urls': ['https://*.google.com/search*'],
    },
    ['blocking'],
);


