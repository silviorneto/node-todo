import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(search.toLowerCase());
        });
      });
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  remove(table, id) {
    if (!Array.isArray(this.#database[table])) {
      return res.writeHead(404).end();
    }

    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      const removedItem = this.#database[table].splice(rowIndex, 1);
      this.#persist();
      return removedItem;
    }

    return null;
  }

  update(table, id, data) {
    if (!Array.isArray(this.#database[table])) return;

    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      const taskToUpdate = {
        id,
        ...this.#database[table][rowIndex],
        ...data,
      };
      this.#database[table][rowIndex] = taskToUpdate;
      this.#persist();

      return taskToUpdate;
    }

    return null;
  }

  completeTask(table, id) {
    if (!Array.isArray(this.#database[table])) return;

    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      const completedTask = {
        id,
        ...this.#database[table][rowIndex],
        completed_at: new Date(),
      };
      this.#database[table][rowIndex] = completedTask;
      this.#persist();

      return completedTask;
    }

    return null;
  }
}
