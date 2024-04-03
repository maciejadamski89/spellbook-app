# Spellbook App

This is a web application named `Spellbook App`. It's a `Next.js` project that allows users to manage and interact with a collection of "spellbooks". Each spellbook can contain various information and attributes.

## Technologies Used

This project uses the following technologies:

[Next.js](https://nextjs.org/): A React framework for building JavaScript applications.

[Prisma](https://prisma.io): An open-source database toolkit used for database access, migrations, and administration.

[TypeScript](https://typescriptlang.org): A statically typed superset of JavaScript that adds types to the language.

[React](https://reactjs.org): A JavaScript library for building user interfaces.

[Tailwind CSS](https://tailwindcss.com/docs/installation): A utility-first CSS framework for rapidly building custom designs.

[tRPC](https://trpc.io): A framework for building typesafe APIs.

## Installation

### Default

1. Clone the repository to your local machine.

2. Install the dependencies by running `npm install` in the project root directory.

3. Run the migrations to set up the database by executing `npm run migrations`.

4. To start the development server, run `npm run dev`. Open http://localhost:3000 with your browser to see the result. The page auto-updates as you edit the file.

### Using Devcontainers

This project supports development in a Docker container through the use of `devcontainers`.

### Prerequisites

Before you start, make sure you have Docker installed on your machine.

-   For Linux or MacOS, you can download Docker from [here](https://docs.docker.com/get-docker/).
-   For Windows, you need to install Docker Desktop, which you can download from [here](https://www.docker.com/products/docker-desktop).

To open this project in a container, follow these steps:

1. Install the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension in VS Code.

2. In the command palette, run the "Remote-Containers: Open Folder in Container..." command and select container you want to use:

-   Production -> `bun run build && bun --bun run start`
-   Development -> `bun --bun run dev`

3. Wait for the container to build and start. Once it's ready, you'll be connected to the VS Code server running inside the container, and you can start developing as usual.

## Testing

Currently, there is no specific command for running tests in this project. However, you can use the npm run lint command to run the linter and check for any syntax errors or inconsistencies in the code.
