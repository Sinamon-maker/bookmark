import * as Yup from 'yup';

export const tasksEditSchema = Yup.object().shape({
  taskText: Yup.string().required('Enter text'),
  detailes: Yup.string(),
});
