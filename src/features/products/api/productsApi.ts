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
    getEpisode: () => {
        return instance.get('episode')
    },
    getStatusCharacter: (arg:{filter: string, value: string}) => {
        return instance.get(`character/?${arg.filter}=${arg.value}`)
    },
    getSpeciesCharacter: (arg: string) => {
        return instance.get(`character/?species=${arg}`)
    },
    getCharacterBySearchParams:(arg: { status: string,species: string,gender:string}) => {
        return instance.get(`character/?status=${arg.status}&species=${arg.species}&gender=${arg.gender}`)
        // return instance.get(`character/?status=alive&species=animal`)
    }
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