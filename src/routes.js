import { TodoService } from "./services.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const service = new TodoService();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handlers: (req, res) => service.get(req, res),
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handlers: (req, res) => service.post(req, res),
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handlers: (req, res) => service.put(req, res),
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handlers: (req, res) => service.delete(req, res),
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handlers: (req, res) => service.patch(req, res),
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks/upload"),
    handlers: (req, res) => service.upload(req, res),
  },
];
