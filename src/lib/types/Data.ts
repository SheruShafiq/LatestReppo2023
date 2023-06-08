export type Data = {
    id: string;
    name: string;
    phone_number: string;
    mobile_number: string;
    email: string;
    postal_code: string;
    housenumber: number;
    housenumber_addition: string;
    street: string;
    city: string;
    relations: Relation[];
} ;

export type Relation = {
    id: string;
    external_number: string;
    initials: string;
    first_name: string;
    last_name: string;
    gender: string;
    birthdate: string;
    policies: Policy[];
};

export type Policy = {
    id: string;
    external_number: string;
    product_name: string;
    product_code: string;
    indexation: boolean;
    status: string;
    premium: number;
    premium_period: string;
    premium_frequency: string;
    premium_enddate: string;
    payment_method: string;
    iban: string;
    distribution_costs: number;
    coverage: number;
};

export type userData = Data | null;
