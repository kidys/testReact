const express = require("express");
const server = express();
const graphql = require("express-graphql");
const schema = require("./schema/schema");

server.use("/graphql", graphql({
    schema,
    graphiql: true
}));

server.listen(3005, error => {
    error ? console.error(error) : console.log("Server is run success!");
});