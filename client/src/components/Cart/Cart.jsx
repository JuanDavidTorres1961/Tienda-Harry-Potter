import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Cards } from "../Cards/Cards";
import { createPortal } from "react-dom";
import { Modal } from "../Modal/Modal";
import logo from "../../../images/logo.png";
import '../Cart/Cart.css'



export const Cart = () => {
  const URL = "https://harry-potter-api.onrender.com/libros";
  const urlPortadas = "../json/portadas.json";

  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [books, setBooks] = useState([]);
  const [portadas, setPortadas] = useState([]);

  const handleAddCart = (Id) => {
    const isAlreadyInCart = cart.some((book) => book.id === Id);

    if (!isAlreadyInCart) {
      const bookToAdd = books.find((book) => book.id === Id);

      if (bookToAdd) {
        setCart([...cart, bookToAdd]);
        setCount(count + 1);
      } else {
        console.warn("Book not found with ID:", Id);
      }
    } else {
      alert("Ya Se Agregó Este Libro Al Carrito");
    }
  };

  const handleCleanCart = () => {
    setCart([]);
    setCount(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();
        const booksWithNewInfo = data.map((book) => {
          return {
            ...book,
            stock: Math.floor(Math.random() * 15),
            price: Math.floor(Math.random() * 300) + 50,
          };
        });
        setBooks(booksWithNewInfo);
        console.log(booksWithNewInfo);

        const portadas = await fetch(urlPortadas);
        if (!portadas.ok) {
          throw new Error("Error gettin covers");
        }
        const dataPortadas = await portadas.json();

        setPortadas(dataPortadas);
        console.log(dataPortadas);
      } catch (error) {
        console.error("something went wrong", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <header className="header-cart">
        <div className="marca">
          <img src={logo} alt="Logo" className="logo"/>
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            <Icon icon="tdesign:cart" width="20" height="20" />
            {count}
          </button>
        </div>
        {showModal &&
          createPortal(
            <Modal
              handleCleanCart={handleCleanCart}
              setCart={setCart}
              cart={cart}
              setCount={setCount}
              count={count}
              onClose={() => {
                setShowModal(false);
              }}
            ></Modal>,
            document.body
          )}
      </header>
      <Cards
        count={count}
        handleAddCart={handleAddCart}
        books={books}
        portadas={portadas}
      ></Cards>
    </div>
  );
};