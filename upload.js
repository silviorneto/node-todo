import fs from "node:fs";
import { parse } from "csv-parse";
import http from "node:http";

const csvFilePath = new URL("./tasks.csv", import.meta.url);

async function readCsvFile() {
  const tasks = fs.createReadStream(csvFilePath).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
    })
  );

  for await (const task of tasks) {
    const data = JSON.stringify({
      title: task.title,
      description: task.description,
    });

    const req = http.request(
      {
        hostname: "localhost",
        port: 3333,
        path: "/tasks",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        res.setEncoding("utf-8");
        res.on("data", (chunk) => {
          console.log(chunk);
        });
        res.on("end", () => {
          console.log("Nome more data in response");
        });
      }
    );

    req.on("error", (e) => {
      console.error(`Problem with request: ${e.message}`);
    });

    req.write(data);
    req.end();
  }

  console.log("Arquivo lido com sucesso");
}

readCsvFile().catch((e) => console.error("Erro ao ler aquivo CSV: ", e));
