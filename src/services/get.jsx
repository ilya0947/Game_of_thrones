
export default class getResours{
    constructor() {
        this.API_URL = 'https://anapioficeandfire.com/api';

    }
    
    
    async get(url) {
        
        const res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Status: ${res.status}`)
        }
    
        return await res.json();
    }

    async getAllCharacters(page = 5) {
        const res = await this.get(`${this.API_URL}/characters?page=${page}&pageSize=10`);
        return res.map(this._transform(res));
    }

    async getCharacter(id) {
        const res = await this.get(`${this.API_URL}/characters/${id}`);
        return this._transform(res);
    }

    getAllHouses() {
        const res = this.get(`${this.API_URL}/houses/`);
        return res;
    }

    getHouses(id) {
        const res = this.get(`${this.API_URL}/houses/${id}`);
        return res;
    }

    getAllBooks() {
        const res = this.get(`${this.API_URL}/books`);
        return res;
    }

    getBooks(id) {
        const res = this.get(`${this.API_URL}/books/${id}`);
        return res;
    }

    _transform({name,gender,born,died,culture}) {
        return {
            name: name || 'no data',
            gender: gender || 'no data',
            born: born || 'no data',
            died: died || 'no data',
            culture: culture || 'no data'
        }
    }
}