import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const { offerId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //   console.log(offerId);

  useEffect(() => {
    const fetchOffer = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${offerId}`
      );
      //   console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchOffer();
  }, [offerId]);
  return isLoading === true ? (
    <div>En cours de chargement</div>
  ) : (
    <div>
      <h2> {data.product_name}</h2>
      <img
        src={data.product_image.secure_url}
        style={{ height: "200px" }}
        alt=""
      />
      <p>{data.product_price}</p>
      <div>
        {data.product_details.map((item) => {
          //   console.log(Object.keys(item));
          const keys = Object.keys(item);
          return (
            <div>
              <p>
                {keys[0]} : {item[keys[0]]}
              </p>
            </div>
          );
        })}
        <Link
          to="/payment"
          state={{ title: data.product_name, price: data.product_price }}
        >
          Acheter{" "}
        </Link>
      </div>
    </div>
  );
};

export default Offer;
