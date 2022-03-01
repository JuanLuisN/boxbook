const buscar = document.getElementById("buscar");
const librosList = document.getElementById("librosList")
const modalList = document.getElementById("modalList")
    import { traerLibros } from "./scripts.js"
    import { ListElement } from "./ListElement.js"
    import { BooksModals } from "./ListElement.js"

    buscar.addEventListener("input", async () => {
        const books = await traerLibros(buscar.value)
        librosList.innerHTML = ""
        books.map((book) => librosList.innerHTML += ListElement(book))
    });

    buscar.addEventListener("input", async () => {
        const books = await traerLibros(buscar.value)
        modalList.innerHTML = ""
        books.map((book) => modalList.innerHTML += BooksModals(book))
        console.log(books)
    });

    const main = () => { };

    main();