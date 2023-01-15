# IPFS Human-readable Name System

## Background
This project creates a human-readable name system for content hashes, similar to ENS or other on-chain name systems for wallet addresses. 
Right now, there are two common ways to do a name-to-hash mapping in IPFS:

- Browser bookmarks
	- You can bookmark a gateway link and even use it in private browsing mode
	- But you have to save the link permanently, and there's no easy way for others to access the mapping since it's just on your browser

- DNSLink
	- This is already integrated with the Brave browser, IPFS companion extension, and IPFS daemon
	- But you have to own a DNS record, and you can't purchase the domain with blockchain tokens

## Setup
- Deploy the Solidity contracts to an EVM-compatible chain
- Set any name->hash records in the contracts' storage
- Run `npm run build` and upload the `dist/` file as an unpacked Chrome extension to your browser
