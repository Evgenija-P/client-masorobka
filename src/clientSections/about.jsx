import * as icons from "../icons/iconComponent";
import leftImg from "../images/spice.png";
import logo from "../images/logo.png";
import { MTitle } from "../components/Title";
import { titleAnimation } from "../helpers/stylesHelpers";

const About = () => {
  return (
    <div className="bg-about bg-no-repeat bg-cover min-h-[920px] pb-12 relative" id="about">
      <img src={leftImg} alt="spice" className="absolute top-[-190px]" />
      <div className="max-w-[1440px] mx-auto px-[10px] relative">
        <img
          src={logo}
          alt="logo"
          className="hidden w-[200px] h-[220px] md:inline md:absolute top-[50px] right-[45px]"
        />
        <MTitle tClass="pt-14 mb-10" type="white" variants={titleAnimation} initial="hidden" whileInView="visible">
          Трохи про М&apos;ясорОбку
        </MTitle>
        <h2 className="text-4xl font-bold text-txt-main-white "></h2>
        <div className="flex flex-col gap-y-6">
          <div className="bg-bg-orange max-w-[420px] rounded-3xl md:absolute top-[176px] left-[10px] md:left-[120px] py-3 px-5">
            <div className="flex justify-center">
              <icons.Flag />
              <p className="text-center text-xl font-medium pl-1 pb-2 underline">Початок історії</p>
            </div>
            <p className="font-medium">
              Наша історія починається з мрії одного перспективного та молодого чоловіка Євгена Бадехи - мрії про
              власний бізнес, що принесе користь рідному місту Запоріжжя та нашій країні у ці скрутні часи. На початку
              війни він був першим, хто почав виготовляти продукцію для наших військових та передавати на фронт. Вже
              змалечку він відчував пристрасть до м&apos;яса і проводив години на кухні прагнучи навчитися усім
              найкращим сімейним традиціям.
            </p>
          </div>
          <div className="bg-bg-light-orange max-w-[468px] rounded-3xl md:absolute top-[586px] left-[10px] md:left-[300px] py-3 px-6">
            <div className="flex justify-center">
              <icons.Lamp />
              <p className="text-center text-xl font-medium pl-1 pb-2 underline">Принципи</p>
            </div>
            <p className="font-medium">
              Ретельний відбір продукції та дотримання найвищих стандартів якості стали основними принципами нашого
              бізнесу. Сьогодні наш онлайн-магазин м&apos;ясних виробів пропонує широкий вибір з делікатесів з
              м&apos;яса різного виду, що робить нас корисними для всіх - людям з порушенням травленням,
              спортсменам, людям що худнуть і найголовніше - нашим військовим, які мають особливі умови в нинішній час.
            </p>
          </div>
          <div className="bg-bg-brown max-w-[428px] rounded-3xl md:absolute top-[385px] right-[10px] md:right-[143px] py-3 px-6 text-txt-main-white">
            <div className="flex justify-center">
              <icons.Lock />
              <p className="text-center text-xl font-medium pl-1 pb-2 underline">Ідея</p>
            </div>
            <p className="font-medium">
              Так виникла ідея заснувати м&apos;ясний онлайн магазин - місце, де всі можуть насолоджуватися якісними
              м&apos;ясними продуктами прямо у своїх домівках. Наші постачальники - фермерські господарства Запорізької
              області, що допомагають нашій їжі ставати смачнішою, а раціон - здоровим.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
