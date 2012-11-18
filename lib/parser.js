var Dissolve = require("dissolve"),
    Concentrate = require("concentrate"),
    util = require("util"),
    dgram = require("dgram");

var Parser = module.exports = function Parser() {
  Dissolve.call(this);

  this.loop(function(end) {
    this.uint16be("id").uint16be("bits").tap(function() {
      this.vars.qr = this.vars.bits & 0x01;
      this.vars.opcode = (this.vars.bits >> 1) & 0x10;
      this.vars.aa = (this.vars.bits >> 5) & 0x01;
      this.vars.tc = (this.vars.bits >> 6) & 0x01;
      this.vars.rd = (this.vars.bits >> 7) & 0x01;
      this.vars.ra = (this.vars.bits >> 8) & 0x01;
      this.vars.z = (this.vars.bits >> 9) & 0x08;
      this.vars.rcode = (this.vars.bits >> 12) & 0x10;
    }).uint16be("qdcount").uint16be("ancount").uint16be("nscount").uint16be("arcount").tap(function() {
      this.emit("data", this.vars);
      this.vars = {};
    });
  });
};
util.inherits(Parser, Dissolve);
