const forceSSL = require('express-force-ssl');
const operatorsService = require('../services/operatorsService');
const updateService = require('../services/updateService');
const yamlService = require('../services/yamlService');
const { useSSL, releaseDate } = require('../utils/constants');

const addCORSHeader = (request, response, next) => {
  const hasOrigin = request.headers.origin != null;

  response.set('Access-Control-Allow-Origin', hasOrigin ? request.headers.origin : '*');
  response.set('Access-Control-Allow-Credentials', !hasOrigin);
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS, PATCH');

  const requestHeaders = request.headers['access-control-request-headers'];

  if (requestHeaders != null) {
    response.set('Access-Control-Allow-Headers', requestHeaders);
  }

  next();
};

const forceToSSL = (request, response, next) => {
  if (useSSL) {
    forceSSL(request, response, next);
    return;
  }

  next();
};

const sendReleaseDate = (request, response) => {
  const releaseInfo = {
    releaseDate,
    currentTime: Date.now()
  };
  response.send({ releaseInfo });
};

module.exports = app => {
  app.get('/api/*', forceToSSL, addCORSHeader);
  app.post('/api/webhook', forceToSSL, addCORSHeader);

  app.get('/api/operators', operatorsService.fetchOperators);
  app.get('/api/operator', operatorsService.fetchOperator);
  app.post('/api/webhook', updateService.updateLocalOperators);
  app.get('/api/releasedate', sendReleaseDate, addCORSHeader);

  app.get('/install/*.yaml', yamlService.generateInstallYaml);
  app.get('/installopenshift4/*.yaml', yamlService.generateInstallYaml4);

};
