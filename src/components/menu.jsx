import PropTypes from "prop-types";

const NAV_ELEMENTS = [
  { name: "Про нас", linkId: "#about" },
  { name: "Магазин", linkId: "#shop" },
  { name: "Контакти", linkId: "#contacts" },
  // { name: "Оптовим покупцям", linkId: "wholesale" },
];

const Menu = ({ section, styles }) => {
  return (
    <ul
      className={`flex flex-col justify-between ${
        section === "header"
          ? "xl:flex-row items-center gap-x-3 lg:gap-x-11 h-20"
          : "gap-y-3 mb-8 xl:mb-1 w-full xl:w-[160px]"
      } ${styles}`}
    >
      {NAV_ELEMENTS.map((el) => (
        <li key={el.name} className="mx-auto md:ml-0">
          <a
            href={el.linkId}
            className="cursor-pointer text-2xl font-bold hover:text-txt-main-yellow focus:text-txt-main-yellow"
          >
            {el.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

Menu.propTypes = {
  section: PropTypes.oneOf(["header", "footer"]),
  styles: PropTypes.string,
};

export default Menu;
