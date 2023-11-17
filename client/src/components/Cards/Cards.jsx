import React from "react";
import "./Cards.css";

export const Cards = ({ handleAddCart, books, portadas }) => {
  const handleAddToCart = (bookId) => {

    const bookToAdd = books.find((book) => book.id === bookId);
    if (bookToAdd && bookToAdd.stock > 0) {
      handleAddCart(bookId);

      const updatedBooks = books.map((book) => {
        if (book.id === bookId) {
          return { ...book, stock: book.stock - 1 };
        } else {
          return book;
        }
      });
      setBooks(updatedBooks);
    } else {
      alert("The book is out of stock");
    }
  };

  return (
    <section className="books-container">
      {books.map((book) => (
        <div className="book" key={book.id}>
          {portadas.length && (
            <img
              src={portadas.find((portada) => portada.id === book.id).portada}
              alt=""
              className="book-cover"
              width={200}
              height={300}
            />
          )}
          <div key={book.id} className="book-info">
            <h1 className="book-title">{book.libro}</h1>
            <p className="book-price">$ {book.price}</p>
            {book.stock ? (
              <div>
                <p className="book-stock">STOCK {book.stock}</p>
                <button onClick={() => handleAddToCart(book.id)}>
                  AÑADIR AL CARRITO
                </button>
              </div>
            ) : (
              <p>AGOTADO</p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};
