import React, { useState, useEffect } from "react";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...Array.from(files)],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storage = getStorage();
    const imageUrls = [];

    for (let i = 0; i < formData.images.length; i++) {
      const image = formData.images[i];
      const storageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      imageUrls.push(url);
    }

    const data = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      stock: formData.stock,
      marcaId: formData.marcaId,
      subcategoryId: formData.subcategoryId,
      images: imageUrls,
    };

    try {
      const response = await axios.post(
        "https://e-commerce-test-hqul.onrender.com/products/create",
        data
      );
      console.log("Product created:", response.data);
      alert("Product created successfully!");

      // Reset form data
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        marcaId: "",
        subcategoryId: "",
        images: [],
      });
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product!");
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
          multiple
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
