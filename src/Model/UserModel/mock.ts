import {UserModel} from "./index";

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function generateRandomName(): string {
    const names = ['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Sarah', 'David', 'Laura', 'Robert', 'Emma'];
    return getRandomElement(names);
}

function generateRandomFamilyName(): string {
    const familyNames = ['Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    return getRandomElement(familyNames);
}

function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateRandomEmail(): string {
    const domains = ['example.com', 'mock.com', 'test.com'];
    const userName = generateRandomString(8);
    const domain = getRandomElement(domains);
    return `${userName}@${domain}`;
}

function generateRandomPhoneNumber(): string {
    const digits = '0123456789';
    let phone = '';
    for (let i = 0; i < 10; i++) {
        phone += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return phone;
}

function generateRandomAddress(): string {
    const streetNames = ['Main St', 'High St', 'Broadway', 'Maple Ave', 'Oak St'];
    const cities = ['Springfield', 'Rivertown', 'Lakeside', 'Hilltop', 'Sunnyvale'];
    const states = ['CA', 'NY', 'TX', 'FL', 'IL'];
    const streetNumber = Math.floor(Math.random() * 1000);
    const streetName = getRandomElement(streetNames);
    const city = getRandomElement(cities);
    const state = getRandomElement(states);
    const zipCode = (Math.floor(Math.random() * 90000) + 10000).toString();
    return `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode}`;
}

export function generateRandomMockUser(): UserModel {
    return {
        id: Math.floor(Math.random() * 10000),  // Random number as ID
        name: generateRandomName(),             // Random actual name
        family: generateRandomFamilyName(),     // Random actual family name
        email: generateRandomEmail(),           // Random email
        password: generateRandomString(12),     // Random password of length 12
        phone: generateRandomPhoneNumber(),     // Random phone number of length 10
        address: generateRandomAddress()        // Random address
    };
}