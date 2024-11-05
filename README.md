# Lista de Tarefas

Esse projeto é parte integrante do curso de NodeJS da Rocketseat e consiste em uma API para buscar tarefas, criar, editar e deletar tarefas específicas.

## Rodando o projeto

- `npm run dev` => roda o projeto em modo de desenvolvimento
- `npm run upload` => carrega um arquivo nomeado como `tasks.csv` no diretório raiz do projeto e adicionar as tarefas descritas neste arquivo na lista de tarefas.

## Endpoints

`GET` **/tasks**

- Exemplo de resposta
```json
[
  {
    "id": "ca9bdb36-9482-4bea-9639-51395b3cfd86",
    "title": "Tarefa 1",
    "description": "Descrição da Tarefa 1",
    "completed_at": null,
    "created_at": "2024-11-05T03:31:42.858Z",
    "updated_at": "2024-11-05T03:31:42.858Z"
  },
  {
    "id": "fb56a792-af50-4dfc-8c34-5d3e52173fee",
    "title": "Tarefa 2",
    "description": "Descrição da Tarefa 2",
    "completed_at": null,
    "created_at": "2024-11-05T03:31:42.859Z",
    "updated_at": "2024-11-05T03:31:42.859Z"
  }
]
```

`POST` **/tasks**

- Exemplo de requisição

```json
{
    "title": "Tarefa 3",
    "description": "Descrição da Tarefa 3",
}
```

`PUT` **/tasks/<uuid>**

- Exemplo de requisição

```json
{
  "title": "Tarefa 3 atualizada",
  "description": "Descrição da Tarefa 3",
}
```

`PATCH` **/tasks/<uuid>/complete**

Esta rota marca a tarefa como completa


`DELETE` **/tasks/<uuid>**

## Validações de campos ['POST','PUT']

### Title
- Campo obrigatório
- Necessário ser do tipo string
- Possuir entre 3 e 30 caracteres

### Description
- Campo obrigatório
- Necessário ser do tipo string
- Possuir entre 3 e 100 caracteres


