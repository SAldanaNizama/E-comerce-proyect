import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    marcaId: "",
    subcategoryId: "",
  });

  const [marcas, setMarcas] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-test-hqul.onrender.com/marcas"
        );
        setMarcas(response.data);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-test-hqul.onrender.com/subcategories"
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error al obtener las subcategorías:", error);
      }
    };

    fetchMarcas();
    fetchSubcategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://e-commerce-test-hqul.onrender.com/products",
        product
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Descripción:
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Precio:
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Stock:
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Marca:
        <select name="marcaId" value={product.marcaId} onChange={handleChange}>
          <option value="">Seleccione una marca</option>
          {marcas.map((marca) => (
            <option key={marca.id} value={marca.id}>
              {marca.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Subcategoría:
        <select
          name="subcategoryId"
          value={product.subcategoryId}
          onChange={handleChange}
        >
          <option value="">Seleccione una subcategoría</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Crear Producto</button>
    </form>
  );
};

export default CreateProductForm;
