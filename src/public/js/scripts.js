export const traerLibros = async (q) => {
    if (q === "" || q === undefined) return []
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}`
    const response = await fetch(url)
    const { items } = await response.json()

    const bookInfo = items.map((item) => item.volumeInfo)
    const bookRequiredInfo = bookInfo.map(
        ({
          title,
          authors,
          pageCount,
          imageLinks,
          publisher,
          publishedDate,
          description,
          categories,
        }) => ({
          title,
          authors,
          pageCount,
          imageLinks,
          publisher,
          publishedDate,
          description,
          categories,
        })
    )
    return bookRequiredInfo
}