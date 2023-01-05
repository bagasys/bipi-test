# BIPI.ID Test - CRUD GraphQL Backend

## Project Setup

### Postgres Database

This application required postgres database. There is a `docker-compose.yml` to spin up a postgres instance.

Run this docker command to run a postgres instance on port 5432, username: postgres, and password: password.

```
docker compose up -d
```

To enter the CLI of the docker instance.

```
docker exec -it bipi-postgres bash
```

To enter the CLI of the postgres, run this command inside the docker instance.

```
psql -U postgres
```

### ENV Variables

Here is an example of the .env file for this application.

```
DATABASE_HOSTNAME=localhost
DATABASE_NAME=bipi_test
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_PORT=5432
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_POOL_IDLE_TIMEOUT_MILLIS=2000
```



### Run Migration

After having a running instance of postgres database, execute this command to execute the migration

```
npx knex migrate:latest
```

### Run Development Server

Install dependencies.

```
npm install
```

start development server.

```
npm start
```

GraphQL playground can be accessed in `http://localhost:4000/graphql`



## GraphQL Operations

### Query

```
type Query {
  hello: String!
  merchants(options: GetMerchantsSpec!): [Merchant!]!
  getMerchantById(id: Int!): Merchant!
}
```

### Mutation

```
type Mutation {
  createMerchant(options: CreateMerchantSpec!): Merchant!
  toggleMerchantIsActive(options: ToggleMerchantIsActiveSpec!): String!
  updateMerchant(options: UpdateMerchantSpec!, id: Int!): Merchant!
}
```

### Other Entities

```
type Merchant {
  id: Int!
  merchant_name: String!
  phone_number: String!
  latitude: Float!
  longitude: Float!
  is_active: Boolean!
  created_at: DateTime!
  updated_at: DateTime!
}

input GetMerchantsSpec {
  limit: Int = 10
  offset: Int = 0
  sort_by: MerchantSortingBy = CreatedAt
  order: SortingOrder = Descending
}

enum MerchantSortingBy {
  CreatedAt
  UpdatedAt
}

enum SortingOrder {
  Ascending
  Descending
}



input CreateMerchantSpec {
  merchant_name: String!
  phone_number: String!
  latitude: Float!
  longitude: Float!
  is_active: Boolean!
}

input ToggleMerchantIsActiveSpec {
  ids: [Int!]!
  is_active: Boolean!
}

input UpdateMerchantSpec {
  merchant_name: String
  phone_number: String
  latitude: Float
  longitude: Float
  is_active: Boolean
}
```

