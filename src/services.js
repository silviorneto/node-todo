import { randomUUID } from "node:crypto";
import { Database } from "./databases.js";

export class TodoService {
  #db = new Database();

  get(req, res) {
    const { search } = req.query;

    const tasks = this.#db.select(
      "tasks",
      search
        ? {
            title: search,
            description: search,
          }
        : null
    );

    res.end(JSON.stringify(tasks));
  }

  post(req, res) {
    const { title, description } = req.body;

    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.#db.insert("tasks", task);

    return res.writeHead(201).end();
  }

  put(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;

    const resp = this.#db.update("tasks", id, {
      title,
      description,
      updated_at: new Date(),
    });

    if (!resp) {
      return res.writeHead(404).end();
    }

    return res.end();
  }

  delete(req, res) {
    const { id } = req.params;

    const resp = this.#db.remove("tasks", id);

    if (!resp) {
      return res.writeHead(404).end();
    }

    return res.end();
  }

  patch(req, res) {
    const { id } = req.params;

    const resp = this.#db.completeTask("tasks", id);

    if (!resp) {
      return res.writeHead(404).end();
    }

    return res.end();
  }
}
