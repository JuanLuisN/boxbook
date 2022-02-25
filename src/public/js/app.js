const buscar = document.getElementById("buscar");
const librosList = document.getElementById("librosList")
    import { traerLibros } from "./scripts.js"
    import { ListElement } from "./ListElement.js"

    buscar.addEventListener("keyup", async () => {
        const books = await traerLibros(buscar.value)
        if(books.length > 0){
            librosList.innerHTML = ""
            books.map((book) => librosList.innerHTML += ListElement(book))
        }
    });

    const main = () => { };

    main();