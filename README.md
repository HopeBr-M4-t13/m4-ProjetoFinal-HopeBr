# m4-ProjetoFinal-HopeBr

HopeBr - API
Este é o backend da aplicação HopeBr – um site de doações voluntárias! O objetivo dessa aplicação é conseguir conectar as pessoas que precisam de 
alguma doação (donatários) com as pessoas que podem fazer uma doação.

Endpoints
A API tem um total de 20 endpoints, sendo divididos em 5 grupos: CRUD do user (que pode ser um doador e/ou donatário), session (login), donations 
(doações), posts (solicitações de doações) e categories (que são as mesmas para donations e posts).

Endpoints:

USERS
POST /users - Criação de usuário
GET /users - Lista todos os usuários
GET /users/<id> - Lista um usuário específico
PATCH /users/<id> - Atualiza um usuário
PATCH /users/<id>/address - Atualiza um endereço de usuário
PATCH /users/<id>/image - Atualiza uma imagem de usuário
DELETE /users/<id> - Realiza um soft delete no usuário

SESSION
POST /session - Gera o token de autenticação

DONATIONS
POST /donations - Criação de uma doação
GET /donations - Lista todas as doações
GET /donations/<id> - Lista uma doação específica
PATCH /donations/<id> - Atualiza uma doação
DELETE /donations/<id> Realiza um soft delete na doação

POSTS
POST /posts - Criação de um post
GET /posts - Lista todos os posts
GET /posts/<id> - Lista um post específico
PATCH /posts/<id> -  Atualiza um post
DELETE /posts/<id> - Realiza um soft delete no post

CATEGORIES
GET /categories - Lista todas as categorias disponíveis
GET /categories/<id> - Lista as donations e os posts de uma categoria específica
