const request = require('supertest');
const express = require('express');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should;
chai.use(require('chai-as-promised'));
chai.use(require('chai-json-schema'));

const config = require("../config");
const header = require('../utils/header');

/* to log the info, require below modules */
var log4js = require("log4js");
var log = require("../utils/logger")
log4js.configure(log.logging());
var logger = log4js.getLogger();

const query = {
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
};

const invalidQuery = {
};

describe('PUT Tests for /posts', () => {

    let route = config.baseUrl;
    let url;
    let headers = header.plainHeader();

  it('PUT should return ok response and response check', () => {
    request(route)
      .put('/posts')
      .set('Content-type', 'application/json; charset=UTF-8')
      .send({ query })
      .then((response) => {
    logger.info("Number of Records in POST API with url ", url, "is ", response.body.length)
        expect(200, { id: 1, userId: 1, body: 'bar', title: 'foo'});
      expect(response.body).to.be.an.instanceof(Object);
      response.body.every(i => expect(i).to.have.all.keys('body', 'id', 'title', 'userId'))
    })
  });

  

it('PUT invalid request Body return 500 response', (done) => {
    request(route)
    .put('/posts')
    .set('Content-type', 'application/json; charset=UTF-8')
    .send({ invalidQuery })
    .then((response) => {
        expect(response.statusCode).to.equal(404);
    })
    .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
});

});
