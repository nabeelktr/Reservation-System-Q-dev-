import * as Yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

const dateValidationSchema = Yup.object({
  date: Yup.date()
  .nullable()
  .required("Please choose a date")
  .test(
    "is-today-or-later",
    "Date must be today or later",
    value => value === null || value >= today
  )
});

export default dateValidationSchema;
