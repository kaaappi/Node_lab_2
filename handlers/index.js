export function handleIndex(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Welcome to the homepage!");
}
