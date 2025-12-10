# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading
[repository](https://github.com/SviatlanaPuzevich/nodejs2025Q2-service)

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application in Docker

Create a `.env` file in the project root and set the following parameters(see `env.example`):

```
PORT=4000
DATABASE_URL=postgresql://postgres_user:postgres_pass@postgres_db:5432/home_library_db

POSTGRES_USER=postgres_user
POSTGRES_PASSWORD=postgres_pass
POSTGRES_DB=home_library_db

```

From the **project root**, run:
```
docker compose up --build

```
for hot reload you can try to use 
```
docker compose up --watch
```

If you are running from another directory, use the -f flag to specify the path to the docker-compose.yml file:
```
docker compose -f /path/to/docker-compose.yml up --build

```

The application will be available locally at port from `.env` file
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Optional: Stop Containers

To stop the containers:

```
docker compose down
```

To remove volumes as well (clears database data):

```
docker compose down -v
```

## Testing

Tests can be run inside the container if dev dependencies are installed, or locally using

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### Using Prebuilt Docker Image
You can pull the prebuilt image with:

```
docker pull guzick/home_library_api:latest
```

**Note**: To run this image, you still need a PostgreSQL container and proper `DATABASE_URL` and `PORT` environment variables.

### Notes for Windows Users

Sometimes issues may occur with base images. If this happens, pull the base image manually:
```
docker pull node:24.11.1-alpine
```


Hot-reload is not fully supported on Windows. It is recommended to try hot-reload on Linux or macOS.