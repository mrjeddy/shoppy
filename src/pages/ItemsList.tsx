import { Link } from "react-router-dom";
import { products } from "../data";

export default function ItemsList() {
  return (
    <>
      <div className="list-box">
        {products.map((item) => {
          return (
            <Link className="text-link" to={"detais/" + item.id}>
              <div className="item-box">
                <div>
                  <img
                    className="item-box-img"
                    src={item.colors[0].images[0]}
                  />
                </div>
                <div>{item.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <div>{}</div>
    </>
  );
}
