import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetchToys();
  }, []);

  const fetchToys = () => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data))
      .catch((error) => console.error("Error fetching toys: ", error));
  };

  const handleAddToy = (newToy) => {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((data) => {
        setToys([...toys, data]);
      })
      .catch((error) => console.error("Error adding toy: ", error));
  };

  const handleDeleteToy = (id) => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setToys(toys.filter((toy) => toy.id !== id));
      })
      .catch((error) => console.error("Error deleting toy: ", error));
  };

  const handleLikeToy = (id, likes) => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes }),
    })
      .then(() => {
        const updatedToys = toys.map((toy) =>
          toy.id === id ? { ...toy, likes } : toy
        );
        setToys(updatedToys);
      })
      .catch((error) => console.error("Error updating likes: ", error));
  };

  return (
    <>
      <Header />
      <ToyForm onAddToy={handleAddToy} />
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onLikeToy={handleLikeToy}
      />
    </>
  );
}

export default App;
