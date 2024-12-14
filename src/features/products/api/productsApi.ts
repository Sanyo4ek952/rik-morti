import axios from "axios";


const instance = axios.create({
    baseURL: "https://rickandmortyapi.com/api/"
})

export type ResponseType = {
    info: {
        count: number,
        pages: number,
        next: null | string,
        prev: null | string
    },
    results: CharacterType[]
}
export const rikAndMortiAPI = {
    getCharacter: () => {
        return instance.get<ResponseType>('character')
    },
}



export type CharacterType = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    like?:boolean
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}