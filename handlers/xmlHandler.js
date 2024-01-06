export function handleXML(req, res) {
  if (req.method === "POST") {
    res.writeHead(200, { "Content-Type": "application/xml" });
    res.end("<response><message>XML response</message></response>");
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }
}
