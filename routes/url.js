const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handlerEjs,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/test",handlerEjs);

module.exports = router;
