const express = require("express");
const routes = express.Router();
// const admin = require("../model/schema")
const ctl = require("../controller/ctl");

routes.get("/api/users", ctl.data);
routes.post('/api/users', ctl.adddata);
routes.delete('/api/users/:id', ctl.delete);

routes.put('/api/users/:id',ctl.edit)

module.exports = routes;