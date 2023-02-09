# WiP: Tigris + tRPC + Next.js

A relatively simple example demonstrating the following tech stack:

## Tech stack

- [Next.js](https://nextjs.org/) - web framework
- [Tigris](https://www.tigrisdata.com) - database
- [tRPC](https://trpc.io) - Remote Proceduce Call library that enable Type inference across client and server

## Development

### Prerequisites

* A [Tigris Cloud](https://www.tigrisdata.com) account
* Install the [Tigris CLI](https://www.tigrisdata.com/docs/sdkstools/cli/installation/)
* [Node.js > 18.13.0](https://nodejs.org/en/download/) installed

### Get the code and install dependencies

```bash
git clone git@github.com:tigrisdata-community/tigris-trpc-nextjs.git
cd tigris-trpc-nextjs
npm install
```

### Create your Tigris Project

Create your Tigris project and Tigris application keys, and set environmental variables.

### Setup

1. Login to the [Tigris Console](https://console.preview.tigrisdata.cloud/)
2. Create a Project called `tigris_trpc_nextjs` (or some other name if you prefer)
3. Navigate to **Application Keys**
4. Click the eye icon next to the Key with the same name as your Project
5. Create a `.env.development.local` file and copy:
  - **URL** to a variable named `TIGRIS_URI`
  - **Name** to a variable named `TIGRIS_PROJECT`
  - **Client ID** to a variable named `TIGRIS_CLIENT_ID`
  - **Client Secret** to a variable named `TIGRIS_CLIENT_SECRET`
6. Finally, add another variable called `TIGRIS_DB_BRANCH` with a value of `develop`

An example `.env.development.local` is in the repo called `.env.development.local.example`.

### Run the app

```shell
npm run dev
```

## Contribute 🙌

Please do get involved! Issues and Pull Requests very much sought and appreciated.

## Code of Conduct

See the [Tigris Community Code of Conduct](https://www.tigrisdata.com/docs/community/code-of-conduct/).
