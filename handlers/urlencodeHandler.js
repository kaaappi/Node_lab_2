function parseURLEncodedData(urlEncodedString) {
  const parsedData = {};
  const pairs = urlEncodedString.split("&");

  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value);

    if (parsedData[decodedKey]) {
      if (Array.isArray(parsedData[decodedKey])) {
        parsedData[decodedKey].push(decodedValue);
      } else {
        parsedData[decodedKey] = [parsedData[decodedKey], decodedValue];
      }
    } else {
      parsedData[decodedKey] = decodedValue;
    }
  });

  return parsedData;
}

export function handleURLEncode(req, res) {
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const parsedData = parseURLEncodedData(body);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ urlEncodedData: parsedData }));
    });
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }
}
