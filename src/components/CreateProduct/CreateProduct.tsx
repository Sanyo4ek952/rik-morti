import React, {useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useDispatch} from "react-redux";
import {setProduct} from "../../features/products/model/productsSlice";
import {Link} from "react-router-dom";
import {Alert, Snackbar} from "@mui/material";

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
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    // Обработчик отправки формы
    const onSubmit: SubmitHandler<FormData> = (data) => {
        const newProduct = {
            created: "2017-11-04T18:48:46.250Z",
            episode: [],
            gender: "Male",
            id: Date.now(),
            image: data.image,
            location: {name: 'Citadel of Ricks', url: data.location},
            name: data.name,
            origin: {name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1'},
            species: "Human",
            status: "Alive",
            type: "",
            url: "https://rickandmortyapi.com/api/character/1"
        }
        // dispatch(setProduct(data))
        dispatch(setProduct( newProduct));
        console.log('Submitted data:', data);
        setOpenSnackbar(true);
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
                        {...register('image', {
                            required: 'Image URL is required',
                            validate: (value) =>
                                /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value) || 'Invalid URL format'
                        })}
                    />
                    {errors.image && <span>{errors.image.message}</span>}
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        {...register('name', {
                            required: 'Name is required', // Обязательное поле
                            pattern: {
                                value: /^[a-zA-Z\s]+$/, // Только латинские буквы
                                message: 'Name must contain only Latin letters',
                            },
                        })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        {...register('location', {
                            required: 'Location is required', // Обязательное поле
                            pattern: {
                                value: /^[a-zA-Z\s]+$/, // Только латинские буквы
                                message: 'Location must contain only Latin letters',
                            },
                        })}
                    />
                    {errors.location && <span>{errors.location.message}</span>}
                </div>
                <button type="submit">Submit</button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000} // Закрыть через 3 секунды
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Product successfully created!
                </Alert>
            </Snackbar>
        </>
    );
};