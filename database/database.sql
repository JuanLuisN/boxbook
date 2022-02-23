create database boxbook;

use boxbook;

create table usuarios(
    id int primary key auto_increment,
    username varchar(100),
    nombreCompleto varchar(100),
    correo varchar(100),
    contra varchar(300),
    pais varchar(50),
    ciudad varchar(50),
    objetivoAnual int
);