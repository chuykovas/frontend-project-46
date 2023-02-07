### Hexlet tests and linter status:
[![Actions Status](https://github.com/chuykovas/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/chuykovas/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/fe92dfb65431a58fc512/maintainability)](https://codeclimate.com/github/chuykovas/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fe92dfb65431a58fc512/test_coverage)](https://codeclimate.com/github/chuykovas/frontend-project-46/test_coverage)

# Description:
**Difference calculator** is a program that determines the difference between two data structures. A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files.

**Utility features:**

Support for different input formats: yaml, json.
Report generation in the form of plain text, stylish and json.

## Install:
1. Make sure you have installed [Node.js](https://nodejs.org/en/) no lower version 12: ```node -v```.
2. Clone repository: ```git@github.com:pterodactylsam/frontend-project-lvl2.git```.
3. Change directory to frontend-project-lvl2
4. Run the command: ```make install```.

```shell
$ git clone git@github.com:pterodactylsam/frontend-project-lvl2.git
$ cd frontend-project-lvl2
$ make install
```

## Run tests:
```shell
$ make test
```

## Use:
You can use the project as a script in the terminal or as a library in your JavaScript project. You can format the difference in three styles: stylish (default), plain and json.
```shell
$ gendiff -h

Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -f, --format <type>  output format (default: "stylish")
  -V, --version        output the version number
  -h, --help           display help for command
```

### Project asciinemas:
[Демонстрация шага 3. Сравнение плоских json файлов](https://asciinema.org/a/2JXvhxsjiEdYUFkHsM3mKFYeA)

[Демонстрация шага 5. Сравнение плоских yml файлов](https://asciinema.org/a/xov53eRIXUVvGaiuPXNBgGHFE)

[Демонстрация шага 6. Рекурсивное сравнение файлов](https://asciinema.org/a/GuCeX1FufvQUZFjSscHdUgltE)

[Демонстрация шага 7. Плоский формат вывода результата](https://asciinema.org/a/D0mM2iquJe3IJzMWiYhrhNwEv)

[Демонстрация шага 8. Вывод результата в формате json](https://asciinema.org/a/8veuHgskB0lwoO4d1eaUUa1YB)
