
# Test CSV backend
 

## Running the project

Clone

```bash
  git clone https://github.com/Reygis/teste_csv_backend.git
```

Install dependences

```bash
  npm install
```

Start the api

```bash
  npm run dev
```

## Running tests

```bash
  npm run test
```

## Documentation of API

#### Search for files

```http
  GET /api/users?q=
```

| Key   |  Description                           |
| :-------- | :---------------------------------- |
| `q` | Return an array of objects, the key is the name of file |


#### Upload a file

```http
  POST /api/files
```
| body   |  Key                           |
| :-------- | :---------------------------------- |
| `form-data` | incert any name at key, and upload a .txt or .csv file |



## Feedback

If you have any feedback, send me a e-mail to reygis@outlook.com

