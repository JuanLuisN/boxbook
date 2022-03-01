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

create table userBooks(
    id int primary key auto_increment,
    fk_usuario int,
    autor varchar(100),
    titulo varchar(100),
    paginas varchar(100),
    imagen varchar(300),
    fechaPublicacion varchar(50),
    status varchar(50),
    puntaje int,
    revisar varchar(255),
    foreign key(fk_usuario)references usuarios(id)
);

create table userBooksAdvance(
     id int primary key auto_increment,
     fk_usuario int,
     fk_libro int,
     paginasLeidas int,
     comentario varchar(250),
     foreign key (fk_usuario)referencers usuarios(id),
     foreign key (fk_libro)referencers userBooks(id)
 );