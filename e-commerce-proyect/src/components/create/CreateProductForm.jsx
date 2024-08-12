import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    marcaId: "",
    subcategoryId: "",
    images: [],
  });

  const [marcas, setMarcas] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    // Fetching marcas
    const fetchMarcas = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-test-hqul.onrender.com/marcas"
        );
        setMarcas(response.data);
      } catch (error) {
        console.error("Error fetching marcas:", error);
      }
    };

    // Fetching subcategories
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-test-hqul.onrender.com/subcategories"
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchMarcas();
    fetchSubcategories();
  }, []);

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: files ? files[0] : value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setFormData((prevData) => ({
        ...prevData,
        images: [...files], // Guardar todos los archivos seleccionados en el array
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const data = new FormData();
  //   data.append("name", formData.name);
  //   data.append("description", formData.description);
  //   data.append("price", formData.price);
  //   data.append("stock", formData.stock);
  //   data.append("marcaId", formData.marcaId);
  //   data.append("subcategoryId", formData.subcategoryId);
  //   data.append("images", formData.images);

  //   try {
  //     const response = await axios.post(
  //       "https://e-commerce-test-hqul.onrender.com/products/create",
  //       data,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log("Product created:", response.data);

  //     // Mostrar una alerta al usuario
  //     window.alert("Product created successfully!");

  //     // Limpiar los campos del formulario
  //     setFormData({
  //       name: "",
  //       description: "",
  //       price: "",
  //       stock: "",
  //       marcaId: "",
  //       subcategoryId: "",
  //       images: null,
  //     });
  //   } catch (error) {
  //     console.error("Error creating product:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("marcaId", formData.marcaId);
    data.append("subcategoryId", formData.subcategoryId);

    // Iterar sobre las imágenes y agregarlas al FormData
    formData.images.forEach((image) => {
      data.append("images", image);
    });

    try {
      const response = await axios.post(
        "https://e-commerce-test-hqul.onrender.com/products/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product created:", response.data);

      // Mostrar una alerta al usuario
      window.alert("Product created successfully!");

      // Limpiar los campos del formulario
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        marcaId: "",
        subcategoryId: "",
        images: [], // Limpiar el array de imágenes
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Product Name:
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Description:
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Stock:</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Marca:</label>
        <select
          name="marcaId"
          value={formData.marcaId}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">Select a brand</option>
          {marcas.map((marca) => (
            <option key={marca.marcaId} value={marca.marcaId}>
              {marca.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Subcategory:
        </label>
        <select
          name="subcategoryId"
          value={formData.subcategoryId}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">Select a subcategory</option>
          {subcategories.map((subcategory) => (
            <option
              key={subcategory.subcategoryId}
              value={subcategory.subcategoryId}
            >
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">
          Product Images:
        </label>
        <input
          type="file"
          name="images"
          onChange={handleChange}
          className="w-full"
          multiple // Asegúrate de que esté presente el atributo `multiple`
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        Create Product
      </button>
    </form>
  );
};

export default ProductForm;
