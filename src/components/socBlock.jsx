import * as icons from "../icons/iconComponent";
import PropTypes from "prop-types";

const SOC_ELEMENTS = [
  { key: "fb", Icon: icons.Fb, link: "https://www.facebook.com/profile.php?id=61551225297005" },
  { key: "tg", Icon: icons.Tg, link: "https://t.me/Rick_oss" },
  { key: "inst", Icon: icons.Insta, link: "https://www.instagram.com/myasorobka.meals/" },
];

export const SocialLinksBlock = ({ section }) => (
  <ul
    className={` ${
      section === "header" ? "hidden xl:flex flex-col gap-y-6 fixed top-1/3 left-[2%] -translate-y-1/4 z-20" : "hidden"
      // "flex flex-row gap-x-5 justify-between"
    } `}
  >
    {SOC_ELEMENTS.map(({ key, Icon, link }) => (
      <li key={key} className="rounded-full ">
        <a
          href={link}
          className="rounded-full bg-bg-light-grey bg-opacity-20 hover:shadow-soc"
          target="_blank"
          rel="noreferrer"
        >
          <Icon />
        </a>
      </li>
    ))}
  </ul>
);

SocialLinksBlock.propTypes = {
  section: PropTypes.oneOf(["header", "footer"]),
};
