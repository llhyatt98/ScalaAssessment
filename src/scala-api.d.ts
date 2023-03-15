export interface HikersDto {
    hikerData: Hiker[];
}

export interface Hiker {
    id: string;
    speed: number;
}

export interface ApiError {
    error: string;
}
