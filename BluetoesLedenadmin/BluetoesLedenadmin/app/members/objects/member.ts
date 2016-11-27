export class Member {
    Id: number;
    UserData: DataUser;
    PersonalData: DataPersonal;
}

export class DataUser {
    Id: number;
    Email: string;
    Type: string;
}

export class DataPersonal {
    UserId: number;
    Initials: string;
    NamePrefix: string;
    NameFirst: string;
    NameInfix: string;
    NameLast: string;
    NameSuffix: string;
    Street: string;
    Number: number;
    Postalcode: string;
    Place: string;
    Country: string;
    PhoneModile: string;
    PhoneHome: string;
    Email: string;
    birthdate: string;
    Gender: string; 
}