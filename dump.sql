create database cashier;

create table usuarios(
  id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null);
  
  create table categorias(
    id serial primary key,
    descricao text not null);
    
    insert into categorias(descricao) values
 ('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

create table products(
  id serial primary key,
  description varchar(255),
  stock_quantity int,
  price int,
  category_id int,
  foreign key(category_id) references categories(id)
  );
 
create table client(
    id serial primary key,
    name varchar(255),
    email varchar(255)unique,
    cpf varchar(255)unique,
    zipcode int,
    street varchar(255),
    number int,
    neighborhood varchar(255),
    city varchar(255),
    state varchar(255)
  );

create table orders (
    id serial primary key,
    client_id int,
    foreign key (client_id) references client(id),
    observation varchar(255),
    amount int
);
  
  
create table orders_products(
	id serial primary key,
  order_id int,
  foreign key (order_id) references orders(id),
  product_id int,
  foreign key (product_id) references products(id),
  product_quantity int,
  product_price int
);

alter table products add column product_image varchar(255);