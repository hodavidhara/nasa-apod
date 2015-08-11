var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var nock = require('nock');

chai.use(chaiAsPromised);

global.expect = chai.expect;
global.nock = nock;