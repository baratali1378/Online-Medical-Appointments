"use strict";

module.exports = {
  async findTopRated(ctx) {
    try {
      ctx.send({
        data: "hello",
      });
    } catch (error) {
      ctx.throw(500, error);
    }
  },
};
