# es6-template-project
ES 2005 project template for an Express.js and [Node 6](https://nodejs.org/dist/latest-v6.x/docs/api/) apps

If you're using Docker, skip to [that section](#using-docker).

# Using Docker


### Docker installation on Linux
https://www.docker.com/products/docker#/linux

### Docker installation on Mac
https://www.docker.com/products/docker#/mac

### Docker installation on Windows
https://www.docker.com/products/docker#/windows


### Run unit tests
Unit tests are isolated from any external dependencies. You
should be able to run these even in offline mode, as long as you have already built the Docker images.

```
./run-unit-tests.sh
```

### Build and run the app

```
./run-locally.sh
```

**Please notice that initial npm installation takes some time inside Docker**


This should start the app in watch mode. Every code change should automatically 
restart the app and re-run all unit tests.

### Build and run acceptance tests

```
./run-acceptance-tests.sh
```

# Usage

In order to create a new project based on this this template you need to:

```shell
git clone git@bitbucket.org:ofalat/es6-project-template.git new-project
cd new-project
rm -rf .git
git init
```


# Environment variables

Env Variable 	| Description                                                               | Example Value
----------------|---------------------------------------------------------------------------|----------------------
ENV             | Current environment name                                                  | 'local', 'qa', 'live'
PORT            | Default web app port | 8080
LOG_LEVEL       | Logger default log level | 'debug', 'info', 'warn', 'error'
STATSD_ENABLED  | Indicate whether app should send metrics to StatD server e.g.: DataDog?   | 'true', 'false'
STATSD_HOST     | StatsD server host address                                                | '127.0.0.1'
STATSD_PORT     | StatsD server port number                                                 | 8675
