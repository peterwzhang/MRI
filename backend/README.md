# Backend for the HPC Interface

This project is built using Java 17 and Spring Boot. To compile it, simply use:

```sh
mvn install
```

## Running the Project

To run the project, you can either run the JAR produced by maven:

```sh
java -jar target/hpc_interface-0.0.1-SNAPSHOT.jar
```

Or, you can use the provided VS Code `launch.json` (ensure you are using this
folder as the workspace).

Please see the [Database](#database) section to ensure you have the requirements
met to run the server.

## Database

The application requires a postgres database to run. By default, it looks on
`localhost:5432` and uses login `postgres:postgres` to access database
`hpc_interface`. These may be overridden with environment variables `DB_HOST`,
`DB_PORT`, `DB_USER`, `DB_PASS`, and `DB_NAME`.

For tests, the application will create an in-memory database. For this, you must
be running Docker -- no additional action is required.
