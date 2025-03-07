import Cart from "./cart/Cart";
import Logo from "./Logo";

const HeaderComponent = () => {
  return (
    <>
      <header className="flex items-center justify-between p-4 bg-zinc-800 px-10">
        <Logo />
        <Cart />
      </header>
    </>
  );
};

export default HeaderComponent;
