# Backend for the HPC Interface

This project is built using Java 17 and Spring Boot.

To get the needed dependencies/environment (macOS specific instructions):

```sh
brew install postgresql openjdk@17 maven
brew install --cask docker

# start postgres
brew services start postgresql

# setup java env
sudo ln -sfn /usr/local/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk
cat >> ~/.zshrc <<JHOME

export JAVA_HOME="/usr/local/Cellar/openjdk@17/17.0.3/libexec/openjdk.jdk/Contents/Home"
JHOME

# reload shell
source ~/.zshrc
```

For Windows, be sure you are running OpenJDK 17, postgres, maven, and docker.

To compile the project, simply use:

```sh
mvn install
```

## Running the Project

To run the project, you can either run the JAR produced by maven after
compilation (not recommended):

```sh
java -jar target/hpc_interface.war
```

Or, (recommended) you can use the provided VS Code `launch.json` (ensure you are
using this folder as the workspace). We recommend the following VS Code
extensions (be sure to "Install 'code' command in PATH" from VS Code's command
palette (cmd shift p) and reopen your terminal first):

```sh
# Java language support
code --install-extension vscjava.vscode-java-pack
# Mustache (OpenAPI template) syntax highlighting
code --install-extension dawhite.mustache
# Lombok annotation support
code --install-extension GabrielBB.vscode-lombok
# Lint OpenAPI specification documents
code --install-extension mermade.openapi-lint

# if you want, for autoformatting
# Prettier Code Formatter
code --install-extension esbenp.prettier-vscode
# Prettier Code Formatter, but it works with Java
code --install-extension mwpb.java-prettier-formatter

# good things for code quality
# SonarLint linting rules in the Problems tab
code --install-extension SonarSource.sonarlint-vscode
# Check for spelling mistakes
code --install-extension streetsidesoftware.code-spell-checker
```

Please see the [Database](#database) section to ensure you have the requirements
met to run the server.

### Local authentication

The myBama CAS system relies upon the site being served from
hpc-interface-dev.ua.edu, therefore, authentication on `localhost` is
impossible.

To manually override this, add the following to the top of
`getAuthenticatedUser` in
`src/main/java/edu/ua/cs495/hpc_interface/service/AuthenticationService.java`,
where `your-mybama` is the username you wish to use:

```java
userService.createUserIfNotExists("your-mybama");
```

You will also need to comment out the remainder of the method, to prevent
unreachable code errors.

## Database

The application requires a postgres database to run. By default, it looks on
`localhost:5432` and uses login `postgres:postgres` to access database
`hpc_interface`. These may be overridden with environment variables `DB_HOST`,
`DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_NAME`.

After installing postgres, please create a user account and database:

```sql
-- in the shell, run `psql`, then enter the following:
CREATE USER postgres
WITH
  PASSWORD 'postgres' SUPERUSER;

CREATE DATABASE hpc_interface;

-- you can ctrl+D or enter `\q` to exit
```

Liquibase is used to perform automatic database upgrades on application start.
For the changesets, and to add additional changes, edit
`src/main/resources/db/changes` and add a new `.yaml` file in order containing
your changeset.

## API schemas

The API is defined through OpenAPI schemas located in `src/main/resources/api`.
These schemas generate the `edu.ua.cs495.hpc_interface.domain.dto` and
`edu.ua.cs495.hpc_interface.rest.resource` packages automatically (via
`mvn generate-sources`), creating controllers and entity objects that can be
used within the code.

The `api-doc.html` file in this directory is generated automatically by GitHub
Actions and should not be edited manually.

## Batch and job lifecycles

Lifecycle flowcharts for batches and jobs may be found within the `lifecycle`
folder. This contains every possible state of batches and jobs, as well as the
process a few select async tasks
(`/src/main/java/edu/ua/cs495/hpc_interface/async/tasks`) go through.

## SSL

To access the server in your browser, you can use https://localhost:8443/. Note,
this must be over https:// -- SAML does not work over plain HTTP. Upon doing
this, you will get a lot of errors about an untrusted certificate -- to resolve
this, open Keychain Access and drag src/main/resources/certificates/cert.crt
into the regular login keychain (open by default). Then, search for localhost
and mark it as "Always Trust" for SSL (see image). Chrome, of course, is not
happy enough with this, so you must specifically allow it by enabling
chrome://flags/#allow-insecure-localhost. Firefox has a similar setting in
about:config, something to the tune of "allow-enterprise-roots". Safari works
just fine out of the box.
