import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";
import { validate } from "./middlewares/validator.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);
  if (url !== "/tasks/upload") {
    const error = validate(req, res);
    if (!!error) {
      return error;
    }
  }

  const route = routes.find(
    (route) => route.method === method && route.path.test(url)
  );

  if (route) {
    const routeParams = req.url.match(route.path);
    const { query, ...params } = routeParams.groups || {};

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handlers(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333, () => {
  console.log("Server is running on port 3333");
});
