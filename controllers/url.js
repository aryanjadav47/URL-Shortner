const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();
  let redirecturl=body.url;

  await URL.create({
    shortId: shortID,
    redirectURL: redirecturl,
    visitHistory: [],
  });

  return res.render("show",{ 
    id: shortID,
    urls : redirecturl,
  });
  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.render("visit",{
    id:shortId,
    click : result.visitHistory.length,
  });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handlerEjs(req,res){
  return res.render("home");
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handlerEjs,
};
