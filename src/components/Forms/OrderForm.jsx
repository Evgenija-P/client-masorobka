import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { yupResolver } from "@hookform/resolvers/yup";

import ButtonMain from "../UIKit/button";
import TextInput from "./TextInput";
import metaStore from "../../store/meta";
import orderStore from "../../store/orders";
import constants from "../../helpers/constants";
import orderShema from "../../validationSchemas/orderShema";

const formFields = [
  {
    name: "customer_name",
    label: "Прiзвище та Iм'я",
    placeholder: "приклад: Гайденко Тарас Бульбович",
    mask: false,
  },
  {
    name: "phone_number",
    label: "Номер телефону одержувача",
    placeholder: "приклад: +38066-135-12-24",
    mask: constants.PHONE_MASK,
  },
  {
    name: "delivery_address",
    label: "Адреса доставки вiддiлення Нової Пошти",
    placeholder: "приклад: м.Запоріжжя, вул. Шевченка, 1, відділення Нової Пошти №22",
    mask: false,
  },
];

const OrderForm = observer(() => {
  const { handleSubmit, control } = useForm({
    defaultValues: metaStore._orderFormFieldValues,
    resolver: yupResolver(orderShema),
  });

  const onFormSubmit = async (fieldValues) => {
    await orderStore.placeOrderAction(fieldValues);
    metaStore.toggleOrderPopup();
    metaStore.toggleCompleteOrderPopup();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)} className="w-full flex flex-col gap-y-8">
        <ul className="flex flex-col gap-y-4 text-txt-main-white">
          {formFields.map((field) => (
            <li key={field.name} className="">
              <TextInput
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                mask={field.mask}
                control={control}
              />
            </li>
          ))}
        </ul>
        <ButtonMain style="redLarge" btnType="submit">
          {orderStore.isOrderProcessing ? "В обробцi..." : "Замовити"}
        </ButtonMain>
      </form>
    </>
  );
});

export default OrderForm;
