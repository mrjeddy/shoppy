import { useAtom } from "jotai";
import { inCart } from "../App";
import { products, sizes } from "../data";

export default function InBasket() {
  const [cart, setProduct] = useAtom(inCart);

  const deleteItem = (num: string) => {
    setProduct(cart.filter((c) => c.key !== num));
  };
  return (
    <div className="list-box">
      {cart.map((item) => {
        return (
          <div className="item-box">
            <img
              className="item-box-img"
              src={
                products
                  .find((p) => p.id === item.prodId)
                  ?.colors.find((c) => c.id === item.colorId)?.images[0]
              }
            />
            <div>{products.find((p) => p.id === item.prodId)?.name}</div>
            <div>
              цвет:{" "}
              {
                products
                  .find((p) => p.id === item.prodId)
                  ?.colors.find((c) => c.id === item.colorId)?.name
              }
            </div>
            <div>размер: {sizes.find((s) => s.id === item.sizeId)?.label}</div>
            <div>
              цена:{" "}
              {
                products
                  .find((p) => p.id === item.prodId)
                  ?.colors.find((c) => c.id === item.colorId)?.price
              }
            </div>
            <div>
              <button
                onClick={() => {
                  deleteItem(item.key);
                }}
                className="basker-button"
              >
                удалить
              </button>
            </div>
          </div>
        );
      })}
      {!cart.length && <div>корзина пуста</div>}
    </div>
  );
}
