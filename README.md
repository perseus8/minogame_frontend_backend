# minogame


# Mino game frontend project
Built by React.js, Redux Toolkit, TypeScript

## How to install
Please use `yarn` package manager. For the migration, you can check `package.json` script commands.
You should set `.env` file before running the project.
- `yarn install`
- `yarn start`
- `yarn build`

## Project description
I replaced `react-scripts` with `react-app-rewired`, and added `config-overrides.js` webpack configuration file. This is because `react-scripts v5` is not compatible with `@walletconnect`.

I used redux toolkit instead of traditional redux.

I used mui components.

## Wallet Integration
I used wagmi (https://wagmi.sh/) for the wallet integration. There are many other packages for the wallet integration such as web3, web3-modal, usedapp etc.

In my experiences, wagmi is one of the most useful packages in the aspect of customizing and using React Hooks. Wagmi supports various React hooks (https://wagmi.sh/react/hooks/useAccount) and they are very useful.

## Signature Algorithm
I used SIWE standard (https://docs.login.xyz/general-information/siwe-overview/eip-4361).
Since we are using wallet for the authorizing, it is critical to use signature.
We request users to sign our messages when creating profile and updating profile for now.

## Project structure
I followed Next.js structure.

### `components`
The React components are stored.

### `helpers`
The common utility functions are stored.

### `layout`
The top layout components are stored.

### `pages`
The main pages are stored.

### `services`
The api requesting functions, configuration variables, wagmi configuration are stored.

### `store`
The redux toolkit directory

### `styles`
I used Sass styles. The sass files are stored.

### `types`
The data types are stored in this directory as we are using TypeScript.


# Mino game backend project
Built by Nest.js, TypeOrm and PosgreSql

## How to install
Please use `yarn` package manager. For the migration, you can check `package.json` script commands.
You should set `.env` file before running the project.
- `yarn install`
- `yarn start:dev`

## Project structure
The project is composed of two `resources` (`user`, `nft`) and some common modules (`config`, `shared`).

### `User` module
This includes creating, updating and reading actions.
For the creating and updating, it uses `siwe`(https://docs.login.xyz/general-information/siwe-overview/eip-4361) standard for the wallet verification.

### `Nft` module
This includes fetching owned nfts from an address. I used Moralis API to fetch owned nfts. (https://v1docs.moralis.io/moralis-dapp/web3-api/nft-api)

### `WalletService`
This is to validate EVM addresses and to verify `siwe` messages sent from frontend.

### `ConfigService`
This stores the global configuration variables for the project.
