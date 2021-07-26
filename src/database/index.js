"use strict";
const _ = require("lodash");
const db = require("./db.js");

// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataAccessMethod());
    }, 500);
  });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
  const dataAccessMethod = () => _.map(db.usersById, (userInfo) => userInfo);
  return mockDBCall(dataAccessMethod);
};

const getUsersItems = () => {
  const dataAccessMethod = () => Object.values(db.itemsOfUserByUsername).flat();
  return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
  const dataAccessMethod = () => {
    // fill me in :)
    const response = {};
    for (const userName in db.itemsOfUserByUsername) {
      if (Object.hasOwnProperty.call(db.itemsOfUserByUsername, userName)) {
        const list = db.itemsOfUserByUsername[userName];
        if (list.includes(item)) {
          const age = _.find(
            db.usersById,
            (user) => user.username === userName
          ).age;
          if (response.hasOwnProperty(age)) {
            response[age] = response[age] + 1;
          } else {
            response[age] = 1;
          }
        }
      }
    }
    return response;
  };
  return mockDBCall(dataAccessMethod);
};

module.exports = {
  getUsers,
  getUsersItems,
  getListOfAgesOfUsersWith,
};
