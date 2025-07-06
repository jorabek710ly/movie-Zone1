export interface IMovie {
    id: number,
    title: string,
    backdrop_path: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
    overview: string;
    original_language: string;
}

export interface IGenre {
    id: number,
    name: string
}