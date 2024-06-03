var { graphql, buildSchema } = require("graphql");
var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { ruruHTML } = require("ruru/server");

// Schema
var schema = buildSchema(`
  type Query {
    name:String
    age: Int
    address: String
  }
`);

// Resolvers
// fetch data
// process data
var rootValue = {
  age() {
    return 25;
  },
  name() {
    return "John Doe";
  },
};

const app = express();

app.all("/graphql", createHandler({ schema, rootValue }));

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(3000);
console.log("Server is running on port http://localhost:3000/");
