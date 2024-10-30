import http from './axios';

export async function getAllCards(){
    try {
        const response = await http.get('/cards');
        return response.data;
    } catch (error) {
        console.log("Failed to fetch cards:", error);
    }
};

export async function createCard(cardData){
    try {
        const response = await http.post('/cards', cardData);
        return response.data;
    } catch (error) {
        console.log("Failed to create card:", error);
    }
};

export async function updateCard(cardId, cardData){
    try {
        const response = await http.put(`/cards/${cardId}`, cardData);
        return response.data;
    } catch (error) {
        console.log(`Failed to update card with id: ${cardId}`, error);
    }
};

export async function patchCardField (cardId, Field){
    try {
        const response = await http.patch(`/cards/${cardId}`, Field);
        return response.data;
    } catch (error) {
        console.log(`Failed to update card with id: ${cardId}`, error);
    }
};

export async function deleteCard(cardId){
    try {
        const response = await http.delete(`/cards/${cardId}`);
        return response.data;
    } catch (error) {
        console.log(`Failed to delete card with id: ${cardId}`, error);
    }
}