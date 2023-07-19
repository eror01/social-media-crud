import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';


interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {

  const [ user ] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add a description"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
    resolver: yupResolver(schema)
  });

  const postsRef = collection(db, 'posts');

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      user_id: user?.uid
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)} className='form-container'>
      <input type="text" placeholder='Title...' {...register('title')}/>
      <p style={{ color: 'red' }}>{errors.title?.message}</p>
      <textarea placeholder='Description...' {...register('description')}></textarea>
      <p style={{ color: 'red' }}>{errors.description?.message}</p>
      <input className='form-submit' type="submit" value="Create Form" />
    </form>
  )
}