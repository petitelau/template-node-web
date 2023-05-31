const express = require("express");
const router = new express.Router();
const path = require('path');
const { hbsProperties } = require("../config/app.config");
const log4js = require("../services/log4j");
const { getWs } = require("../wss");
const home = require('../services/home')
let logger = log4js.getLogger("cas-wapp");

router.get("", (req, res) => {
  logger.info(`access to 'main' page`);
  res.render("home", { ...hbsProperties, title: "CAS-WebApp" });
});

//post param on body : req.body.paramname

router.get("/home", ({query}, res) => {
  logger.info(`access to 'main' page`);
  console.log(query.wsId)
  let ws = getWs(query.wsId);
  home.demoFn(ws)
  res.send({service: "from : /home"})
});

router.get("/helloWorld", (req, res) => {
  logger.info(`access to 'helloWorld' page`);
  res.redirect("/helloWorld.html");
});

router.get("/about", (req, res) => {
  logger.info(`access to 'about' page`);
  res.render("about", { ...hbsProperties, title: "About Me" });
});

router.get("/help", (req, res) => {
  logger.info(`access to 'help' page`);
  res.render("help", {
    ...hbsProperties,
    title: "Help",
  });
});

module.exports = router;
