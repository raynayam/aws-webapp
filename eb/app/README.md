This is a small web app questionnaire built to be deployed on AWS 

# Start server
```
PORT=4567 npm run start
```

# Installing PostgreSQL Client
```
brew install postgresql@17 or sudo apt install postgresql
```

# Start Postgres server
```
docker-compose up
```

# Create initial database
```
createdb study-sync -h localhost -U postgres
```


# Connect to Postgres Client
```
psql postgresql://postgres:password@localhost:5432/study-sync
```

## Enable UUID extension
```
CREATE EXTENSION "uuid-ossp";
```

## Create a Postgres table

## Create Schema
```
psql study-sync < db/schema.sql -h localhost -U postgres
```

## Insert Data
psql study-sync  <db/>seed.sql -h localhost -U postgres