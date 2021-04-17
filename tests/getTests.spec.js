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

  it('GET should return ok response', () => {
    request(route)
      .get('/posts')
      .then((response) => {
    logger.info("Number of Records in GET Service API with url ", url, "is ", response.body.length)
      expect(response.statusCode).to.equal(200);
      expect(response.body.length).to.be.at.least(100)
    })
  });

  
it('GET response Body JsonSchema check', () => {
    request(route)
    .get('/posts')
    .then((response) => {
        logger.info("status code in GET Service API with url ", url, "is ", JSON.stringify(response.statusCode))
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an.instanceof(Object);
        response.body.every(i => expect(i).to.have.all.keys('body', 'id', 'title', 'userId'))
    })
});

it('GET response Body JsonSchema check for posts/1/comments', () => {
    request(route)
    .get('/posts')
    .then((response) => {
        logger.info("status code in GET Service API with url ", url, "is ", JSON.stringify(response.statusCode))
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an.instanceof(Object);
        response.body.every(i => expect(i).to.have.all.keys('body', 'id', 'postId', 'email', 'name'))
    })
});

it('GET response Body for route param check for one item in array', () => {
    request(route)
    .get('/posts/1')
    .then((response) => {
        //to store the size of response, as it is object ,  convert it to array 
        let responseArray = [response.body]
        logger.info("response in GET Service API when querying 1 record  with url ", url, "is ", JSON.stringify(responseArray))
        expect(response.statusCode).to.equal(200);
        expect(responseArray.length).to.equal(1);
        expect(response.body.id).to.equal(1)
    })

})

it('GET should return 404 response invalid uri', () => {
    request(route)
      .get('/posts/wrongPath')
      .then((response) => {
        logger.info("response in GET Service API with invalid url ", url, "is ", JSON.stringify(resp.body)) 
        logger.info("status code  in GET Service API with invalid url ", url, "is ", JSON.stringify(resp.statusCode))
      expect(response.statusCode).to.equal(404);
    })
  });

it('GET response Body for route param', (done) => {
    request(route)
    .get('/posts/1')
    .expect(200, { id: 1, userId: 1, body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto', title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'}, done);
});

});
