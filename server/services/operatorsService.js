const persistentStore = require('../store/persistentStore');

const fetchOperator = (serverRequest, serverResponse) => {
  persistentStore.getOperator(serverRequest.query.name, (operators, err) => {
    if (err) {
      serverResponse.status(500).send(err);
      return;
    }
    serverResponse.send({ operators });
  });
};

const fetchOperators = (serverRequest, serverResponse) => {
  persistentStore.getOperators((operators, err) => {
    if (err) {
      serverResponse.status(500).send(err);
      return;
    }
    serverResponse.send({ operators });
  });
};

const operatorsService = {
  fetchOperators,
  fetchOperator
};
module.exports = operatorsService;
