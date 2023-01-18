# IPFS Human-readable Name System

## Background
This project creates a human-readable name system for content hashes, similar to the functionality provided by EthDNS and the IPFS companion extension. 
There are two other ways to save a name-to-hash mapping, but the UX isn't as good:

- Browser bookmarks
	- You can bookmark a gateway link, use it in private browsing mode, and there is no monetary cost
	- But you have to save the link permanently, and there's no easy way for others to access the mapping since it's just on your browser

- DNSLink
	- This is already integrated with the Brave browser, IPFS companion extension, and IPFS daemon
	- But you have to purchase the domain with fiat currency, and DNS is centralized and controlled by only a few entities

## Setup
- Deploy the Solidity contracts to an EVM-compatible chain
- Set any name->hash records in the contracts' storage
- Run `npm run build` and upload the `dist/` file as an unpacked Chrome extension to your browser
