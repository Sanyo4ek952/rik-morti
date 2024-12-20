import {ChangeEvent, useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import s from "./products.module.css";
import {CharacterType, ResponseType, rikAndMortiAPI} from "../api/productsApi";
import {useDispatch, useSelector} from "react-redux";
import {setProducts} from "../model/productsSlice";
import {Card} from "../../../components/Card/Card";
import {AppRootStateType} from "../../../app/store";
import {Link, NavLink} from "react-router-dom";

export const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector<AppRootStateType, CharacterType[]>(state => state.products.results);

    const [isLiked, setIsLiked] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [speciesFilter, setSpeciesFilter] = useState<string>("");
    const [genderFilter, setGenderFilter] = useState<string>("");
    const [searchText, setSearchText] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const filteredProducts = products.filter(product => {
        const matchesLiked = isLiked ? product.like === true : true;
        const matchesStatus = statusFilter ? product.status === statusFilter : true;
        const matchesSpecies = speciesFilter ? product.species === speciesFilter : true;
        const matchesGender = genderFilter ? product.gender === genderFilter : true;
        const matchesSearch = searchText
            ? product.name.toLowerCase().includes(searchText.toLowerCase())
            : true;

        return matchesLiked && matchesStatus && matchesSpecies && matchesGender && matchesSearch;
    });

    const fetchData = async (page: number) => {
        try {
            const response = await rikAndMortiAPI.getCharacter(page);
            const data: ResponseType = response.data;
            dispatch(setProducts(data.results));
            setTotalPages(data.info.pages);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };


    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, fetchData]);


    const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

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
                    onChange={(e) => setSearchText(e.target.value)}
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
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
            />
        </>
    );
};
