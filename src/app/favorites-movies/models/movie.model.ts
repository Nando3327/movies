export class DataMovie {
    popularity: number;
    // tslint:disable-next-line:variable-name
    vote_count: number;
    video: boolean;
    // tslint:disable-next-line:variable-name
    poster_path: string;
    id: number;
    adult: boolean;
    // tslint:disable-next-line:variable-name
    backdrop_path: string;
    // tslint:disable-next-line:variable-name
    original_language: string;
    // tslint:disable-next-line:variable-name
    original_title: string;
    title: string;
    // tslint:disable-next-line:variable-name
    vote_average: number;
    overview: string;
    // tslint:disable-next-line:variable-name
    release_date: string;
}

export class DataMovieResponse {
    page: number;
    // tslint:disable-next-line:variable-name
    total_results: number;
    // tslint:disable-next-line:variable-name
    total_pages: number;
    results: Array<DataMovie>;
}
