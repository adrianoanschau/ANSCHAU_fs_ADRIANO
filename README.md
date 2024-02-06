<div align="center" id="top"> 
  <img src="https://www.e-core.com/wp-content/uploads/2022/07/23530_ecore_logos_rgb-06-p..._5603.png.png" width="100" alt="Api" />
&#xa0;
  <h1 align="center">Challenge Code</h1>
</div>

<br>

## Apresentação

Este repositório foi criado para desenvolver e apresentar o desafio de código para a vaga de Senior Fullstack Developer da e-Core.

## Documento do desafio

<a href="./e-Core_CodeChallenge_-_Senior_Fullstack.pdf">e-Core CodeChallenge - Senior Fullstack</a>

## Melhoria para a solução proposta

Nas figuras 2 e 3 apresentadas no desafio, pude identificar a necessidade de uma comunicação com o serviço legado do cliente. Como um serviço legado costuma apresentar diversos desafios com relação a padrões de desenvolvimento principalmente em relação ao tempo que já pode ter sido desenvolvido e também em relação a otimização dos seus recursos para apresentar um tempo de resposta adequado em suas requisições, a proposta de melhoria que apresento é utilização de `CACHE` para armazenar respostas recentes do servidor legado.

Fiz um `MOCK` do servidor legado em MockApi.com, o seguinte endpoint retorna todos os produtos cadastrados: <a href="https://65bce235b51f9b29e9327d3d.mockapi.io/products">Produtos Mockados</a>.

Para gerenciar o cache utilizei `REDIS` e o tempo é configurável através de propriedades para a aplicação.

## As aplicações

Desenvolvi a `API` com Java e Spring Boot, guardando os pedidos em um banco de dados com `PostgresSQL`. Esta Api possui um endpoint para o catálogo de produtos, este que retorna os produtos assim como estão no servidor legado do cliente, porém guarda as resposta em cache para otimizar o tempo de resposta e não estar sempre buscando os mesmos dados no serviço externo.

Para o `frontend` utilizei `Vite` como criar uma aplicação em `React`. Onde temos a listagem de produtos em `/catalog` e a listagem de pedidos em `/orders`, o carrinho de compras é visualizável e gerenciável em qualquer página a partir da barra de navegação ao topo.

## Testes

Quanto aos testes unitários e de componentes me preocupei em trazer o máximo de cobertura no backend, pois acredito que seja o principal em questão aqui. No frontend faltaram testes para a maior parte, porém desenvolvi um mínimo que acredito ser suficiente para que meus conhecimentos sejam avaliados, assim como uma configuração de servidor `mockado` para utilização.

## Melhorias

Para esta aplicação eu adicionaria os seguintes pontos para melhoria:

<ul>
  <span>BACKEND</span>
  <li>Adição de paginação na listagem de pedidos.</li>
  <li>Tratamento de erros.</li>
  <li>Documentação da API com Swagger ou outro.</li>
  <li>Adição de autenticação para identificação do usuário.</li>
  <li>Colocar a API em um container com Docker.</li>
</ul>

<ul>
  <span>FRONTEND</span>
  <li>Ampliação da cobertura de testes para o Frontend.</li>
  <li>Configuração de personalização para o tema do Frontend.</li>
  <li>Guardar o carrinho de compras em `localStorage` para que não se perca quando atualizar a página.</li>
  <li>Adição de autenticação para identificação do usuário.</li>
</ul>

<a href="#top">Back to top</a>
