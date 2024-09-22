import { useAtom } from "jotai";
import { count } from "../App";
import { Link } from "react-router-dom";

export default function TopBar() {
  const size = useAtom(count);

  return (
    <div className="top-bar-box">
      <Link className="text-link" to="/">
        <div>Товары</div>
      </Link>

      <Link className="text-link" to="basket">
        <div>&#129530; {size}</div>
      </Link>
    </div>
  );
}
