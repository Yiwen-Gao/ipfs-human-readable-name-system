const ipfs = require('./ipfs');

// function handleWebRequest(details: chrome.webRequest.WebRequestBodyDetails): chrome.webRequest.BlockingResponse {
//     let url = details.url;
//     const parser = new URL(url);
//     const query = parser.searchParams.get('q');
//
//     const matches = query && /ipfs:\/\/([a-zA-Z]{3,})/.exec(query);
//     // This is a hack to make async calls: https://stackoverflow.com/a/69134172/20253134.
//     (async () => {
//         if (matches && matches.length == 2) {
//             const cid = await ipfs.getCIDForDomainName(matches[1]);
//             console.log('cid', cid);
//             if (cid) {
//                 url = `https://ipfs.io/ipfs/${cid}`;
//                 await chrome.tabs.update(details.tabId, {url: url});
//             }
//         }
//     })();
//
//     return {};
// }
//
// chrome.webRequest.onBeforeRequest.addListener(
//     handleWebRequest,
//     {
//         'urls': ['https://*.google.com/search*'],
//     },
//     ['blocking'],
// );

async function handleOmnibox(input: string): Promise<void> {
    if (!/[a-zA-Z]{3,}/.test(input)) {
        return;
    }

    const options = { active: true, lastFocusedWindow: true };
    const [tabs, cid] = await Promise.all([
        chrome.tabs.query(options),
        ipfs.getCIDForDomainName(input),
    ]);
    console.log('cid', cid);
    if (tabs[0] && tabs[0].id && cid) {
        const activeTab = tabs[0].id;
        const url = `https://ipfs.io/ipfs/${cid}`;
        await chrome.tabs.update(activeTab, {url: url});
    }
}

chrome.omnibox.onInputEntered.addListener(handleOmnibox);
