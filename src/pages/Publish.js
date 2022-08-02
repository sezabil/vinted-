import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("Chemise");
  const [description, setDescription] = useState("très belle chemise");
  const [brand, setBrand] = useState("Zara");
  const [size, setSize] = useState("40");
  const [color, setColor] = useState("Noir");
  const [condition, setCondition] = useState("neuve");
  const [city, setCity] = useState("Paris");
  const [price, setPrice] = useState(45);

  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.data._id) {
        //Je vais déclencher une redirection vers la page de l'offre que je viens de créer
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      //C'est ici que je devrais réagir si j'ai une erreur
    }
  };

  return token ? (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(event) => {
          setPicture(event.target.files[0]);
          setPreview(URL.createObjectURL(event.target.files[0]));
        }}
      />
      <img src={preview} style={{ width: "200px" }} alt="" />
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="text"
        placeholder="brand"
        value={brand}
        onChange={(event) => setBrand(event.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input
        type="text"
        placeholder="size"
        value={size}
        onChange={(event) => setSize(event.target.value)}
      />
      <input
        type="text"
        placeholder="color"
        value={color}
        onChange={(event) => setColor(event.target.value)}
      />
      <input
        type="text"
        placeholder="condition"
        value={condition}
        onChange={(event) => setCondition(event.target.value)}
      />
      <input
        type="text"
        placeholder="city"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <input
        type="text"
        placeholder="price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      <input type="submit" />
    </form>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
