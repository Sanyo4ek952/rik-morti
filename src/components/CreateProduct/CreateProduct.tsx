import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useDispatch} from "react-redux";
import {setProduct} from "../../features/products/model/productsSlice";
import {Link} from "react-router-dom";

// Определяем тип данных для формы
type FormData = {
    image: string; // URL изображения
    name: string; // Имя
    location: string; // Локация
};

export const CreateProduct = () => {
    // Используем хук useForm
    const dispatch = useDispatch();
    const {
        register, // Для регистрации полей формы
        handleSubmit, // Для обработки отправки формы
        formState: {errors}, // Для получения ошибок валидации
    } = useForm<FormData>();

    // Обработчик отправки формы
    const onSubmit: SubmitHandler<FormData> = (data) => {
        const newProduct = {
            created: "2017-11-04T18:48:46.250Z",
            episode: [],
            gender: "Male",
            id: Date.now(),
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            location: {name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3'},
            name: "Rick Sanchez",
            origin: {name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1'},
            species: "Human",
            status: "Alive",
            type: "",
            url: "https://rickandmortyapi.com/api/character/1"
        }
        // dispatch(setProduct(data))
        dispatch(setProduct({[Date.now()]: newProduct}));
        console.log('Submitted data:', data);
        // Здесь вы можете отправить данные на сервер или обработать их
    };

    return (
        <>
        <Link to={'/products'}>Back</Link>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Image URL:</label>
                <input
                    type="text"
                    {...register('image', {required: 'Image URL is required'})}
                />
                {errors.image && <span>{errors.image.message}</span>}
            </div>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    {...register('name', {required: 'Name is required'})}
                />
                {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    {...register('location', {required: 'Location is required'})}
                />
                {errors.location && <span>{errors.location.message}</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
        </>
    );
};