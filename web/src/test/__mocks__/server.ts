import { Factory, Model, createServer } from "miragejs";
import { faker } from "@faker-js/faker";
import * as legacyProducts from "@/mocks/catalog-legacy-products-list.json";

export function makeServer() {
  const server = createServer({
    environment: "test",
    models: { product: Model.extend<Partial<ApiCatalogProduct>>({}) },
    factories: {
      product: Factory.extend<Partial<ApiCatalogProduct>>({
        get id() {
          return faker.string.numeric();
        },
        get name() {
          return faker.commerce.productName();
        },
        get brand() {
          return faker.company.name();
        },
        get price() {
          return Number(faker.commerce.price());
        },
        get oldPrice() {
          return Number(faker.commerce.price());
        },
        get suppliers(): number[] {
          return [];
        },
      }),
    },
    routes() {
      this.get("api/catalog?page=1&limit=9", (schema) => {
        const { models } = schema.all("product");

        return {
          type: "legacy-products",
          data: models,
          message: null,
        };
      });
    },
  });

  legacyProducts.list
    .slice(0, 9)
    .map((product) => server.create("product", product));

  return server;
}
