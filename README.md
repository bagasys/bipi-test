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
  merchants(options: GetMerchantsSpec!): [Merchant!]!
  getMerchantById(id: Int!): Merchant!
}
```

### Mutation

```
type Mutation {
  createMerchant(options: CreateMerchantSpec!): Merchant!
  toggleMerchantsIsActive(options: ToggleMerchantsIsActiveSpec!): String!
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

input ToggleMerchantsIsActiveSpec {
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

## Screenshots

### Create Merchant

![Screenshot from 2023-01-05 15-04-46](https://user-images.githubusercontent.com/37441075/210731821-71bc8783-edbe-4739-af37-d3cf9e0e6756.png)

### Update Merchant

![Screenshot from 2023-01-05 15-05-26](https://user-images.githubusercontent.com/37441075/210731829-6512e90c-7b20-4b52-b6c1-331746a0abac.png)

### Toggle Merchant Is Active in Bulk

![Screenshot from 2023-01-05 15-14-14](https://user-images.githubusercontent.com/37441075/210732841-646c0b40-811c-473c-8a23-859250adfe0b.png)
![Screenshot from 2023-01-05 15-14-26](https://user-images.githubusercontent.com/37441075/210732845-2c2b2af4-43a3-4309-bcbf-69c0256cc16b.png)

### Get List of Merchants

![Screenshot from 2023-01-05 15-02-16](https://user-images.githubusercontent.com/37441075/210731813-12d233c8-1384-4bcc-83d2-83e75040e49d.png)

### Get Merchant By Id

![Screenshot from 2023-01-05 15-03-18](https://user-images.githubusercontent.com/37441075/210731817-3aaa402b-5ac8-4d0f-b45f-b81a7f2375e4.png)
