export type House = {
    id: number | undefined,
    name: string,
    city_id: number,
    floor_id: number,
    stations: [string,number|string][],
    rent: number,
    url: string,
    mayu_minutes: number | undefined,
    toma_minutes: number | undefined,
    rate: number,
    memo: string
}