

export interface Name {
    first: string,
    middle?: string,
    last: string
}



export interface User {
    _id?: string,
    name: Name,
    phone: string,
    email: string,
    password: string,
    image: Image,
    address: Address,
    isBusiness: boolean
}

export interface Login {
    email: string,
    password: string
}


export interface EditUserType {
    _id?: string,
    name: Name,
    phone: string,
    image: Image,
    address: Address
}
export interface Address {
    state?: string,
    country: string,
    city: string,
    street: string,
    houseNumber: number,
    zip?: number,
    _id?: string
}

export interface Image {
    url: string,
    alt: string,
    _id?: string
}


export default interface Card {

    _id?: string,
    title: string,
    subtitle?: string,
    description: string,
    phone: string,
    email: string,
    web?: string,
    image: Image,
    address: Address,
    bizNumber?: number,
    likes?: string[],
    user_id?: string,
    createdAt?: string,
    __v?: number
}