# BackEndTakeHome

**Example Back-End API Request**

> This API is built to request records from a Socrata API dataset found [here](https://data.providenceri.gov/Finance/2017-Property-Tax-Roll/ku9m-5rhr).

- [Getting Started with Node](#getting-started-with-node)
- [Getting Started with Docker](#getting-started-with-docker)
- [Architectural Decisions](#architectural-decisions)

## Dependencies
* [NodeJS](https://nodejs.org/en/)
* [Express](https://www.npmjs.com/package/express)
* [Request](https://www.npmjs.com/package/request)
* [Cors](https://www.npmjs.com/package/cors)
* [Body-Parser](https://www.npmjs.com/package/body-parser)

## Getting started with Node

```bash
# 1. Enter project folder
cd BackEndTakeHome

# 2. Install dependencies.
npm i

# 3. Start server
node api.js

# 4. In your web-browser, navigate to http://localhost:8080/record/# where # is the row number to request
```

## Getting started with Docker

```bash
# 1. Enter project folder
cd BackEndTakeHome

# 2. Build and run container specified from Yaml and Dockerfile
docker-compose up

# 4. In your web-browser, navigate to http://localhost:9000/record/# where # is the row number to request

# 5. Stop the API
docker-compose down
```

## Architectural Decisions
### Trade-offs
* Dataset is globally cached in API
* CORS and middleware parsing is done by third-party modules
* API using limited dataset (1000 rows)
### Production Considerations
* Larger datasets should be housed in database
* CORS and middleware parsing should be configured to accept auth tokens
* Socrata API (SODA) parameter `$limit` can be used to unlimit dataset query from 1000 to max rows, so long as the row count is less than the 50,000 limit
    * See [Here](https://support.socrata.com/hc/en-us/articles/202949268-How-to-query-more-than-1000-rows-of-a-dataset)
