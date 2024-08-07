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

  const [images, setImages] = useState([]);
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

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("marcaId", product.marcaId);
    formData.append("subcategoryId", product.subcategoryId);
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      const response = await axios.post(
        "https://e-commerce-test-hqul.onrender.com/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Manejar la respuesta del backend
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Nombre:
        </label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="description"
        >
          Descripción:
        </label>
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
          Precio:
        </label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="stock">
          Stock:
        </label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="marcaId">
          Marca:
        </label>
        <select
          name="marcaId"
          value={product.marcaId}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Seleccione una marca</option>
          {marcas.map((marca) => (
            <option key={marca.id} value={marca.id}>
              {marca.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="subcategoryId"
        >
          Subcategoría:
        </label>
        <select
          name="subcategoryId"
          value={product.subcategoryId}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Seleccione una subcategoría</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="images">
          Imágenes:
        </label>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        Crear Producto
      </button>
    </form>
  );
};

export default CreateProductForm;
