const TEL_NUMBERS = [{ id: "+38669996046", number: "+380 66 999 60 46" }];

const styleContactsTitle = "text-2xl text-txt-main-yellow leading-[1.6] flex flex-col gap-y-2";
const styleContactsText = "text-base text-txt-main-white opacity-[0.6]";
const styleContactsEffect = "hover:text-txt-main-yellow";

const ContactList = () => {
  return (
    <ul className="flex flex-col lg:flex-row lg:flex-wrap gap-x-8 md:w-[450px] lg:w-[500px] xl:min-w-[600px] mx-auto justify-between">
      <li className={`${styleContactsTitle} min-w-[110px]`}>
        Телефон
        {TEL_NUMBERS.map((tel) => (
          <a href={`tel:${tel.id}`} className={`${styleContactsText} ${styleContactsEffect}`} key={tel.id}>
            {tel.number}
          </a>
        ))}
      </li>
      <li className={`${styleContactsTitle} mb-2 w-[202px]`}>
        Імейл
        <a href="mailto:myasorobkacraft@gmail.com" className={`${styleContactsText} ${styleContactsEffect}`}>
          myasorobkacraft@gmail.com
        </a>
      </li>
    </ul>
  );
};

export default ContactList;
