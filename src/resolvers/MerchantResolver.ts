import { Query, Resolver } from "type-graphql";

@Resolver()
export class MerchantResolver {
  @Query(() => String)
  hello() {
    return "Hello, it's Working!";
  }
}
