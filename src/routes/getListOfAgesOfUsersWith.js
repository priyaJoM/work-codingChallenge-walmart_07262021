"use strict";
const mockDBCalls = require("../database/index.js");

const getListOfAgesOfUsersWithHandler = async (request, response) => {
  const itemToLookup = request.query["item"];
  const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
  return response.status(200).send(JSON.stringify(data));
};

const getListOfAItemsOfUsersWithHandler = async (request, response) => {
  const data = await mockDBCalls.getUsersItems();
  return response.status(200).send(JSON.stringify(data));
};

module.exports = (app) => {
  app.get("/users/age", getListOfAgesOfUsersWithHandler);
  app.get("/users/items", getListOfAItemsOfUsersWithHandler);
};
