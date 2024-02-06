<div align="center" id="top"> 
  <img src="https://www.e-core.com/wp-content/uploads/2022/07/23530_ecore_logos_rgb-06-p..._5603.png.png" width="100" alt="Api" />
&#xa0;
<h1 align="center">Challenge Code</h1>
</div>

<h1 align="center">Api</h1>

<br>

## Tecnologias

<p>
  <img alt="Java 21" src="https://img.shields.io/badge/JAVA-21-blue">
  <img alt="PostgresSQL" src="https://img.shields.io/badge/PostgresSQL-15-blue">
  <img alt="REDIS" src="https://img.shields.io/badge/REDIS-3-blue">

  <img alt="Maven" src="https://img.shields.io/badge/Maven-gray">
  <img alt="Spring Boot" src="https://img.shields.io/badge/Spring Boot-gray">
  <img alt="FlyWay" src="https://img.shields.io/badge/FlyWay-gray">
  <img alt="Docker" src="https://img.shields.io/badge/Docker-gray">
</p>

## Requisitos

Antes de começar, precisamos disponibilizar um serviço de banco de dados e um para cache.

Preparei um docker-compose para ajudar com isso.

Primeiramente garanta que você tenha instalado em sua máquina o necessário para trabalhar com <a href="https://docs.docker.com/" target="_blank">Docker</a>. Em seguida, faça o clone deste repositório e rode o seguinte comando dentro da pasta `api`:

```bash
docker compose up -d --build
```

Este comando irá construir e inicializar um serviço de banco de dados com `PostgresSQL` na porta `5432` e um serviço de `Cache Redis` na porta `6379`.

## Iniciando

Para colocar a aplicação para rodar, rode o seguinte comando dentro da pasta `api`, ele irá colocar a api em `Spring Boot/Java` para rodar na porta `8080`:

```bash
./mvnw spring-boot:run
```

O comando anterior irá, antes de iniciar a api, gerar no banco de dados as tabelas necessárias para a aplicação funcionar.

## Testes

Os testes unitários e de componentes desenvolvidos também irão executar com o comando anterior, mas se quiser ver o relatório de cobertura em `html`, utilize o seguinte comando:

```bash
./mvnw test jacoco:report
```

## Endpoints

Esta api foi projetada para apresentar os seguintes campos no retorno:

<ul>
 <li>type: indica o tipo de informação apresentada no campo data.</li>
 <li>data: dados de retorno do endpoint, pode ser um objeto ou um vetor de objetos.</li>
 <li>message: mensagem de apoio.</li>
</ul>

<br><br>

```bash

{listagem de produtos do catálogo do sistema legado}
[GET] /catalog?page={number}&limit={number}
[RESPONSE]
{
  "type": "legacy-products",
  "data": [
    {
      "id": "string",
      "name": "string",
      "brand": "string",
      "price": 1,
      "oldPrice": 1,
      "suppliers": [],
    },
  ],
  "message": "string",
}

___

{listagem de pedidos}
[GET] /orders
[RESPONSE]
{
  "type": "orders",
  "data": [
    {
      "id": "string",
      "products": [
        {
          "id": "uuid",
          "name": "string",
          "externalId": 1,
          "price": 1,
          "quantity": 1
        }
      ],
    },
  ],
  "message": "string",
}

___

{criação de pedido}
[POST] /orders
[BODY]
{
  "products": [
    {
      "id": 1,
      "name": "string",
      "price": 1,
      "quantity": 1
    },
  ],
}
[RESPONSE]
{
  "type": "orders",
  "data": {
    "id": "string",
    "products": [
      {
        "id": "uuid",
        "name": "string",
        "externalId": 1,
        "price": 1,
        "quantity": 1
      }
    ],
  },
  "message": "string",
}

___

{obter um pedido}
[GET] /orders/{id}
[RESPONSE]
{
  "type": "orders",
  "data": {
    "id": "string",
    "products": [
      {
        "id": "uuid",
        "name": "string",
        "externalId": 1,
        "price": 1,
        "quantity": 1
      }
    ],
  },
  "message": "string",
}

___

{excluir um pedido}
[DELETE] /orders/{id}
[RESPONSE]
{
  "type": "orders",
  "data": null,
  "message": "Order Deleted",
}

```

<a href="#top">Back to top</a>
