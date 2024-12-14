import { useEffect, useState } from "react";
import s from "./products.module.css";
import { CharacterType, rikAndMortiAPI } from "../api/productsApi";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../model/productsSlice";
import { Card } from "../../../components/Card/Card";
import { AppRootStateType } from "../../../app/store";
import { Link, NavLink } from "react-router-dom";

export const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector<AppRootStateType, CharacterType[]>(state => state.products.results);

    const [isLiked, setIsLiked] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>(""); // Фильтр по статусу
    const [speciesFilter, setSpeciesFilter] = useState<string>(""); // Фильтр по виду
    const [genderFilter, setGenderFilter] = useState<string>(""); // Фильтр по полу
    const [searchText, setSearchText] = useState<string>(""); // Текст для поиска

    const filteredProducts = products.filter(product => {
        const matchesLiked = isLiked ? product.like === true : true;
        const matchesStatus = statusFilter ? product.status === statusFilter : true;
        const matchesSpecies = speciesFilter ? product.species === speciesFilter : true;
        const matchesGender = genderFilter ? product.gender === genderFilter : true;
        const matchesSearch = searchText
            ? product.name.toLowerCase().includes(searchText.toLowerCase()) // Поиск по имени, нечувствительный к регистру
            : true;

        return matchesLiked && matchesStatus && matchesSpecies && matchesGender && matchesSearch;
    });

    return (
        <>
            <div>
                <button
                    className={s.button}
                    disabled={!isLiked}
                    onClick={() => setIsLiked(false)}
                >
                    All
                </button>
                <button
                    className={s.button}
                    disabled={isLiked}
                    onClick={() => setIsLiked(true)}
                >
                    Liked
                </button>
                <Link to={"/create-product"}>Create Product</Link>
            </div>
            <div className={s.searchContainer}>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} // Обновляем состояние поиска
                    className={s.searchInput}
                />
            </div>
            <div className={s.filters}>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All Statuses</option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
                <select value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)}>
                    <option value="">All Species</option>
                    <option value="Human">Human</option>
                    <option value="Alien">Alien</option>
                </select>
                <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
            <div className={s.container}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product: CharacterType) => {
                        return (
                            <NavLink key={product.id} to={`/products/${product.id}`}>
                                <Card
                                    imageUrl={product.image}
                                    name={product.name}
                                    location={product.location}
                                    status={product.status}
                                    item={product}
                                />
                            </NavLink>
                        );
                    })
                ) : (
                    "No character found"
                )}
            </div>
        </>
    );
};