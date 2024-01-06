import { handleIndex } from "./handlers/index.js";
import { handleJSON } from "./handlers/jsonHandler.js";
import { handleXML } from "./handlers/xmlHandler.js";
import { handleURLEncode } from "./handlers/urlencodeHandler.js";

export function handleRequest(req, res, parsedUrl) {
  const { pathname } = parsedUrl;
  const contentType = req.headers['content-type'];

  switch (pathname) {
    case "/":
      handleIndex(req, res);
      break;
    case "/json":
      if (contentType === 'application/json') {
        handleJSON(req, res);
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid Content-Type" }));
      }
      break;
    case "/xml":
      if (contentType === 'application/xml' || contentType === 'text/xml') {
        handleXML(req, res);
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid Content-Type" }));
      }
      break;
    case "/urlencode":
      if (contentType === 'application/x-www-form-urlencoded') {
        handleURLEncode(req, res);
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid Content-Type" }));
      }
      break;
    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
  }
}
