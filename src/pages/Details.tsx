import { useParams } from "react-router-dom";
import { colorMap, products, sizes } from "../data";
import { useEffect, useState } from "react";
import { inCart, keys, Product } from "../App";
import { useAtom } from "jotai";

export default function Details() {
  const { item } = useParams();

  const [prodSet, setProduct] = useAtom(inCart);

  const [symb] = useAtom(keys);

  const addToBasket = () => {
    if (!symb.find((s) => s === String(item) + color + size))
      setProduct([
        ...prodSet,
        {
          key: String(item) + color + size,
          prodId: Number(item),
          colorId: color,
          sizeId: Number(size),
        },
      ]);
  };

  const [selColor, setSelColor] = useState<number | undefined>(0);
  const [selSize, setSelSize] = useState<number | undefined>();

  const [color, setColor] = useState(1);
  const [size, setSize] = useState<number | undefined>(undefined);

  const [img, setImg] = useState(0);

  const [product, setProd] = useState<Product | undefined>(undefined);

  const getImg = () => {
    if (
      img ===
      Number(product?.colors.find((col) => col.id === color)?.images.length) - 1
    ) {
      setImg(0);
    } else {
      setImg(img + 1);
    }
  };

  useEffect(() => {
    setProd(products.find((prod) => prod.id === Number(item)));
  }, []);

  return (
    <div className="content-box">
      {/* тип, название */}

      <div className="detail-box-head">
        {product &&
          product.name +
            " " +
            product.colors.find((col) => col.id === color)?.name +
            " "}
        {/* {sizes.find((s) => s.id === size)?.label} */}
        <b>{product?.colors.find((col) => col.id === color)?.price}</b>
      </div>
      <div className="detail-box">
        {/* картинка */}
        <div className="img-box">
          <img
            onClick={getImg}
            className="detail-box-img"
            src={
              product &&
              product.colors.find((col) => col.id === color)?.images[img]
            }
          />
        </div>

        {/* инфа */}
        <div className="detail-box-info">
          <div className="detail-box-text">цвет</div>
          {/* цвета */}
          <div className="color-box">
            {product?.colors.map((col, index) => {
              return (
                <div
                  onClick={() => {
                    setColor(col.id);
                    setImg(0);
                    setSize(undefined);
                    setSelColor(index);
                    setSelSize(undefined);
                  }}
                  className={
                    selColor == index
                      ? "color-box-item cbi-selected"
                      : "color-box-item"
                  }
                  style={{ backgroundColor: colorMap.get(col.name) }}
                ></div>
              );
            })}
          </div>
          <div className="detail-box-text">размер</div>
          {/* размеры */}
          <div className="size-box">
            {sizes.map((sz, index) => {
              return (
                <div
                  onClick={() => {
                    if (
                      product?.colors
                        .find((c) => c.id === color)
                        ?.sizes.includes(sz.id)
                    ) {
                      setSize(sz.id);
                      setSelSize(index);
                    }
                  }}
                  className={
                    product?.colors
                      .find((c) => c.id === color)
                      ?.sizes.includes(sz.id)
                      ? selSize === index
                        ? "size-box-item sbi-selected"
                        : "size-box-item"
                      : "size-box-item sbi-disabled"
                  }
                >
                  {sz.label}({sz.number})
                </div>
              );
            })}
          </div>
          {/* описание */}
          <div className="detail-box-text">
            {product?.colors.find((c) => c.id === color)?.description}
          </div>
          <div className="detail-box-text">
            {size ? (
              <button onClick={addToBasket} className="basker-button">
                в корзину
              </button>
            ) : (
              "цвет не выбран"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
