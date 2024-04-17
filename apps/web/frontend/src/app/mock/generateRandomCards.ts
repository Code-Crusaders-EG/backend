import { faker } from '@faker-js/faker';
import { CardData } from "../core/types";

export const generateRandomCards = (length:number):CardData[]=>{
    console.log("mango");
    const roomCards:CardData[]=[];
    for(let i=0;i<length;i++){
        const cardData:CardData = {
            img: faker.image.abstract(1234, 2345),
            title: faker.person.jobTitle(),
            subTitle: faker.word.words(),
            noActive: 0,
            category: faker.word.words(),
            noResources:faker.number.int(20),
            noMessages: faker.number.int(1000),
        }
        roomCards.push(cardData);
    }
    return roomCards;
}