export const ListElement = (book) => {
    const title = book.title.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
    //const title_sinCaracteres = book.title.replace(/[^a-zA-Z 0-9.]+/g, "")
    return `
    <button class="list-group-item" data-toggle="modal" data-target="#${title.replace(/ /g, "_")}">
        <div class="row">
            <div class="col-md-6">
                <img src="${book.imageLinks.smallThumbnail}" class="img-fluid">
            </div>
            <div class="col-md-6">
                <p>${book.title}</p>
                <h6><small class="text-secondary">${book.authors}</small></h6>
            </div>
        </div>
    </button>
    `
}

export const BooksModals = (book) => {
    const title = book.title.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
    return `
    <div class="modal fade" id="${title.replace(/ /g, "_")}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">AGREGAR LIBRO</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form action="/addBook" method="POST">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-2">
                                <img src="${book.imageLinks.smallThumbnail}" class="img-fluid">
                            </div>
                            <div class="col-md-10 text-justify">
                                <div class="form-group">
                                    
                                </div>
                                <div class="row">
                                    <div class="col-md-8">
                                        <p>Libro: <span class="text-secondary">${book.title}</span></p>
                                    </div>
                                    <div class="col-md-4">
                                    <select name="status" class="form-control ml-auto btn btn-dark text-justify" id="exampleFormControlSelect1">
                                        <option value="Leyendo">Leyendo</option>
                                        <option value="Leído">Leído</option>
                                        <option value="Pendiente">Pendiente</option>
                                    </select>
                                    </div>
                                </div>
                                <p>Autores: <span class="text-secondary">${book.authors}</span></p>
                                <p>Editorial: <span class="text-secondary">${book.publisher}</span></p>
                                <p>Fecha de publicación: <span class="text-secondary">${book.publishedDate}</span></p>
                                <p>Paginas: <span class="text-secondary">${book.pageCount}</span></p>
                                <p>Descripción: <span class="text-secondary">${book.description}</span></p>
                                <input type="text" class="d-none" name="titulo" value="${book.title}"/>
                                <input type="text" class="d-none" name="autor" value="${book.authors}"/>
                                <input type="text" class="d-none" name="fechaPublicacion" value="${book.publishedDate}"/>
                                <input type="text" class="d-none" name="paginas" value="${book.pageCount}"/>
                                <input type="text" class="d-none" name="imagen" value="${book.imageLinks.smallThumbnail}"/>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-dark">Guardar cambios</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `
}