import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({
  cart,
  onClose,
  handleCleanCart,
  setCart,
  setCount,
  count,
}) => {
  const totalPrice = cart.reduce((total, book) => total + book.price, 0);

  const [bookQuantities, setBookQuantities] = useState(
    cart.reduce((quantities, book) => {
      quantities[book.id] = 1;
      return quantities;
    }, {})
  );

  const handleRemoveBook = (book) => {
    const updatedCart = cart.filter((cartBook) => book.id !== cartBook.id);
    setCart(updatedCart);
    setCount(count - 1);
  };

  const handleIncrement = (book) => {
    setBookQuantities((prevQuantities) => ({
      ...prevQuantities,
      [book.id]: prevQuantities[book.id] + 1,
    }));
  };

  const handleDecrement = (book) => {
    if (bookQuantities[book.id] > 1) {
      setBookQuantities((prevQuantities) => ({
        ...prevQuantities,
        [book.id]: prevQuantities[book.id] - 1,
      }));
    }
  };

  return (
    <section className="modal">
      <div className="modal-content">
        <button onClick={onClose}>X</button>
        <h1>CARRITO DE COMPRAS</h1>
        {cart.map((book) => (
          <div key={book.id}>
            <button onClick={() => handleRemoveBook(book)}>
              Eliminar Producto
            </button>
            <h1 className="book-title">{book.libro}</h1>
            <p className="book-price">$ {book.price}</p>
            <button onClick={() => handleIncrement(book)}>▲</button>
            <span>{bookQuantities[book.id]}</span>
            <button onClick={() => handleDecrement(book)}>▼</button>
          </div>
        ))}
        {cart.length ? (
          <div>
            <button onClick={handleCleanCart}>Limpiar Carrito</button>
            <p>TOTAL: {totalPrice}</p>
          </div>
        ) : (
          <h1>Carrito vacío</h1>
        )}
      </div>
    </section>
  );
};
