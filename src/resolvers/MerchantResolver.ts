import knex from "../knex";
import {
  Resolver,
  Mutation,
  Arg,
  Query,
  InputType,
  Field,
  Float,
  ObjectType,
  Int,
} from "type-graphql";
import { GraphQLError } from "graphql";

@ObjectType()
export class Merchant {
  @Field(() => Int)
  id: number;

  @Field()
  merchant_name: string;

  @Field()
  phone_number: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  is_active: boolean;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}

@InputType()
class CreateMerchantSpec {
  @Field()
  merchant_name: string;

  @Field()
  phone_number: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  is_active: boolean;
}

@InputType()
class ToggleMerchantIsActiveSpec {
  @Field(() => [Int])
  ids: [number];

  @Field()
  is_active: boolean;
}

@Resolver()
export class MerchantResolver {
  @Query(() => String)
  async hello() {
    return "Hello, it's Working!";
  }

  @Query(() => [Merchant])
  async merchants() {
    const merchants = await knex.select("*").from("merchants");
    return merchants;
  }

  @Query(() => Merchant)
  async getMerchantById(@Arg("id", () => Int) id: number) {
    const [merchant] = await knex
      .select("*")
      .where({ id: id })
      .from("merchants");

    if (!merchant) {
      throw new GraphQLError(
        `Merchant with id of ${id} not found`,
        null,
        null,
        null,
        null,
        null,
        {
          code: "NOT_FOUND",
          http: {
            status: 404,
          },
        }
      );
    }

    return merchant;
  }

  @Mutation(() => Merchant)
  async createMerchant(
    @Arg("options", () => CreateMerchantSpec) options: CreateMerchantSpec
  ) {
    const [merchant] = await knex.insert([options], ["*"]).into("merchants");
    console.log(Merchant);
    return merchant;
  }

  @Mutation(() => String)
  async toggleMerchantIsActive(
    @Arg("options", () => ToggleMerchantIsActiveSpec)
    options: ToggleMerchantIsActiveSpec
  ) {
    const updatedCount = await knex("merchants")
      .where((queryBuilder) => queryBuilder.whereIn("id", options.ids))
      .update({
        is_active: options.is_active,
      });
    return `successfuly updated ${updatedCount} merchants' is_active to ${options.is_active}`;
  }
}
