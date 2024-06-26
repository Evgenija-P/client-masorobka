import About from "./clientSections/about";
import Discount from "./clientSections/discount";
import Favourite from "./clientSections/favourite";
import Footer from "./clientSections/footer";
import HeaderHero from "./clientSections/headerHero";
import Products from "./clientSections/products";
import Review from "./clientSections/review";

import { observer } from "mobx-react-lite";

import AlertPopup from "./components/UIKit/AlertPopup";
import clientStore from "./store/client";
import meta from "./store/meta";
import orderStore from "./store/orders";
import Cart from "./components/cart";
import CartPopup from "./components/popups/CartPopup";
import OrderPopup from "./components/popups/OrderPopup";
import CompleteOrderPopup from "./components/popups/CompleteOrderPopup";

const ClientPage = observer(() => {
  const toggleSwitchFromCartToOrder = () => {
    meta.toggleOrderPopup();
    meta.toggleCartPopup();
  };

  return (
    <>
      <Cart onClick={() => meta.toggleCartPopup()} />
      <HeaderHero />
      <Products />
      <Favourite />
      <About />
      <Review />
      <Discount />
      {meta._isCartPopupShown && (
        <CartPopup
          onClose={() => meta.toggleCartPopup()}
          onGoToTheOrder={toggleSwitchFromCartToOrder}
        />
      )}
      {meta._isOrderPopupShown && (
        <OrderPopup
          onClose={() => meta.toggleOrderPopup()}
          onBackToTheCart={toggleSwitchFromCartToOrder}
        />
      )}
      {meta._isCompleteOrderPopupShown && (
        <CompleteOrderPopup
          orderNumber={orderStore.order_number}
          onComplete={() => meta.toggleCompleteOrderPopup()}
        />
      )}
      <Footer />
      {clientStore.error && (
        <AlertPopup onOk={() => clientStore.setError("")}>
          <h1 className="text-2xl">{clientStore.error}</h1>
        </AlertPopup>
      )}
      {orderStore.error && (
        <AlertPopup onOk={() => orderStore.setError(null)}>
          <h1 className="text-2xl">{orderStore.error}</h1>
        </AlertPopup>
      )}
    </>
  );
});
export default ClientPage;
