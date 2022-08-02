import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

//https://lereacteur-vinted-api.herokuapp.com/offers

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);

  useEffect(() => {
    try {
      const fetchOffers = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?limit=5&page=${page}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      };
      fetchOffers();
    } catch (error) {
      console.log(error.message);
    }
  }, [page]);
  return isLoading === true ? (
    <div>En cours de chargement</div>
  ) : (
    <div>
      <h1>{data.count} offres à raison de 5 offre par page</h1>
      <button onClick={() => setPage(page - 1)}>Page précédente</button>
      <button onClick={() => setPage(page + 1)}>Page suivante</button>
      {data.offers.map((offer) => {
        // console.log(offer._id);
        return (
          <Link to={`/offer/${offer._id}`}>
            <div>
              <h2>{offer.product_name}</h2>
              <img
                style={{ height: "150px" }}
                src={offer.product_image.secure_url}
                alt=""
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
