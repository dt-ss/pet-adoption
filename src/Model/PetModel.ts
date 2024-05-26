export interface PetModel {
    id: number
    ownerId: number
    name: string
    image?: string
    description: string
    birthDate: string
    type: PetType
}

export const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Reptile', 'Other'] as const;
export type PetType = typeof petTypes[number];

const petNames = [
    'Buddy', 'Bella', 'Charlie', 'Max', 'Luna', 'Rocky', 'Lucy', 'Milo', 'Bailey', 'Daisy',
    'Cooper', 'Sophie', 'Duke', 'Zoe', 'Rex', 'Lily', 'Chester', 'Molly', 'Oscar', 'Sadie'
];

const descriptions = [
    'A friendly and playful pet who loves to run and fetch.',
    'A calm and affectionate pet that enjoys lounging around.',
    'An energetic pet that loves to explore new places.',
    'A curious pet that is always up for an adventure.',
    'A loyal pet that loves spending time with its owner.'
];



const randomImageUrls = [
  "https://placedog.net/410/300?random",
  "https://placedog.net/411/300?random",
  "https://placedog.net/412/300?random",
  "https://placedog.net/413/300?random",
  "https://placedog.net/414/300?random",
  "https://placedog.net/415/300?random",
  "https://placedog.net/416/300?random",
  "https://placedog.net/417/300?random",
  "https://placedog.net/402/300?random",
  "https://placedog.net/403/300?random",
  "https://placedog.net/404/300?random",
  "https://placedog.net/405/300?random",
  "https://placedog.net/406/300?random",
  "https://placedog.net/407/300?random",
  "https://placedog.net/408/300?random",
  "https://placedog.net/409/300?random"
];

const getRandomElement = (arr:any) => arr[Math.floor(Math.random() * arr.length)];

const getRandomDate = (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
};

const generateRandomPet = (id: number): PetModel => ({
    id,
    ownerId: Math.floor(Math.random() * 100) + 1,
    name: getRandomElement(petNames),
    image: getRandomElement(randomImageUrls),
    description: getRandomElement(descriptions),
    birthDate: getRandomDate(new Date(2010, 0, 1), new Date(2021, 12, 31)),
    type: getRandomElement(petTypes),
});

const generatePets = (count: number): PetModel[] => Array.from({length: count}, (_, index) => generateRandomPet(index + 1));

export const PetModelMock: PetModel[] = generatePets(20);