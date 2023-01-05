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
  registerEnumType,
} from "type-graphql";
import { GraphQLError, GraphQLErrorExtensions } from "graphql";

function createGraphQLError(
  message: string,
  extensions: GraphQLErrorExtensions
) {
  return new GraphQLError(message, null, null, null, null, null, extensions);
}

enum SortingOrder {
  Ascending = "ASCENDING",
  Descending = "DESCENDING",
}

enum MerchantSortingBy {
  CreatedAt = "CreatedAt",
  UpdatedAt = "UpdatedAt",
}

registerEnumType(SortingOrder, {
  name: "SortingOrder",
});

registerEnumType(MerchantSortingBy, {
  name: "MerchantSortingBy",
});

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
class UpdateMerchantSpec {
  @Field(() => String, { nullable: true })
  merchant_name?: string;

  @Field(() => String, { nullable: true })
  phone_number?: string;

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => Boolean, { nullable: true })
  is_active?: boolean;
}

@InputType()
class ToggleMerchantsIsActiveSpec {
  @Field(() => [Int])
  ids: [number];

  @Field()
  is_active: boolean;
}

@InputType()
class GetMerchantsSpec {
  @Field(() => Int, { defaultValue: 10 })
  limit: number;

  @Field(() => Int, { defaultValue: 0 })
  offset: number;

  @Field(() => MerchantSortingBy, { defaultValue: MerchantSortingBy.CreatedAt })
  sort_by: MerchantSortingBy;

  @Field(() => SortingOrder, { defaultValue: SortingOrder.Descending })
  order: SortingOrder;
}

@Resolver()
export class MerchantResolver {
  @Query(() => [Merchant])
  async merchants(
    @Arg("options", () => GetMerchantsSpec) options: GetMerchantsSpec
  ) {
    const sorting_order =
      options.order === SortingOrder.Ascending ? "asc" : "desc";

    let sort_by = "";

    switch (options.sort_by) {
      case MerchantSortingBy.CreatedAt: {
        sort_by = "created_at";
        break;
      }
      case MerchantSortingBy.UpdatedAt: {
        sort_by = "updated_at";
        break;
      }
      default: {
        sort_by = "created_at";
        break;
      }
    }

    const merchants = await knex
      .select("*")
      .from("merchants")
      .limit(options.limit)
      .offset(options.offset)
      .orderBy(sort_by, sorting_order);
    return merchants;
  }

  @Query(() => Merchant)
  async getMerchantById(@Arg("id", () => Int) id: number) {
    const [merchant] = await knex
      .select("*")
      .where({ id: id })
      .from("merchants");

    if (!merchant) {
      throw createGraphQLError(`Merchant with id of ${id} not found`, {
        code: "NOT_FOUND",
        http: {
          status: 404,
        },
      });
    }

    return merchant;
  }

  @Mutation(() => Merchant)
  async createMerchant(
    @Arg("options", () => CreateMerchantSpec) options: CreateMerchantSpec
  ) {
    const [merchant] = await knex.insert([options], ["*"]).into("merchants");
    return merchant;
  }

  @Mutation(() => String)
  async toggleMerchantsIsActive(
    @Arg("options", () => ToggleMerchantsIsActiveSpec)
    options: ToggleMerchantsIsActiveSpec
  ) {
    const updatedCount = await knex("merchants")
      .where((queryBuilder) => queryBuilder.whereIn("id", options.ids))
      .update({
        is_active: options.is_active,
      });
    return `successfuly updated ${updatedCount} merchants' is_active to ${options.is_active}`;
  }

  @Mutation(() => Merchant)
  async updateMerchant(
    @Arg("id", () => Int) id: number,
    @Arg("options", () => UpdateMerchantSpec) options: UpdateMerchantSpec
  ) {
    const is_options_empty = Object.keys(options).length === 0;

    if (is_options_empty) {
      throw createGraphQLError(`Options cannot be empty`, {
        code: "BAD_REQUEST",
        http: {
          status: 400,
        },
      });
    }
    const [merchant] = await knex("merchants")
      .where({ id: id })
      .update(options, ["*"]);

    if (!merchant) {
      throw createGraphQLError(`Merchant with id of ${id} not found`, {
        code: "NOT_FOUND",
        http: {
          status: 404,
        },
      });
    }

    return merchant;
  }
}
