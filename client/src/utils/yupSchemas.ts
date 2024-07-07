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


const BookingSchema = Yup.object().shape({
  employeeName: Yup.string()
    .trim()
    .required('Employee name is required'),
  employeeId: Yup.string()
    .required('Employee ID is required')
    .matches(/^E\d{3}$/, 'Employee ID must be in the format E001'),
});

export  {dateValidationSchema, BookingSchema};
