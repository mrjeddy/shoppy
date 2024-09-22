import { Route, Routes } from "react-router-dom";
import "./App.css";
import ShopLayout from "./layouts/ShopLayout";
import ItemsList from "./pages/ItemsList";
import { atom, Provider } from "jotai";
import Details from "./pages/Details";
import InBasket from "./pages/inBasket";

export interface Product {
  id: number;
  name: string;
  colors: {
    id: number;
    name: string;
    images: string[];
    price: string;
    description: string;
    sizes: number[];
  }[];
}

export interface SelectedProduct {
  key: string;
  prodId: number;
  colorId: number;
  sizeId: number;
}

export const inCartCount = atom(0);

export const inCart = atom<SelectedProduct[]>([]);
export const count = atom((get) => get(inCart).length);
export const keys = atom((get) => get(inCart).map((item) => item.key));

export function App() {
  return (
    <Provider>
      <Routes>
        <Route element={<ShopLayout />}>
          <Route path="/" element={<ItemsList />} />
          <Route path="/detais">
            <Route index element={<Details />} />
            <Route path=":item" element={<Details />} />
          </Route>
          <Route path="/basket" element={<InBasket />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
