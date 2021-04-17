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


describe('GET Tests for /posts', () => {

    let route = config.baseUrl;
    let url;
    let headers = header.plainHeader();

  it('GET should return ok response', (done) => {
    request(route)
      .delete('/posts/1')
      .expect(200, done);
  });
});