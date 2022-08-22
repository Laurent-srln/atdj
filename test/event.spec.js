
const { expect, assert } = require('chai');
const chai = require('chai');
chai.should();

const chaiHttp = require('chai-http');;
chai.use(chaiHttp);

const app = require('../index.js');