
export default class getResours{
    constructor() {
        this.API_URL = 'https://anapioficeandfire.com/api';
        this.noData = 'No data :(';

    }
    
    
    async get(url) {
        
        const res = await fetch(url);
        // console.log(res)
        
        if (!res.ok) {
            throw new Error(`Status: ${res.status}`)
        }
    
        return await res.json();
    }

    getAllCharacters = async (page = 5) => {
        const res = await this.get(`${this.API_URL}/characters?page=${page}&pageSize=10`);
        // console.log(res)
        return res/* .map(this._transform(res)) */;
    }
    
    getCharacter = async (id) => {
        const res = await this.get(`${this.API_URL}/characters/${id}`);
        return this._transformChar(res);
    }
    
    getAllHouses = async () => {
        const res = await this.get(`${this.API_URL}/houses/`);
        // console.log(res)
        return res;
    }
    
    getHouses = async (id) => {
        const res = await this.get(`${this.API_URL}/houses/${id}`);
        // console.log(res)
        return this._transformHouse(res);;
    }
    
    getAllBooks = async () => {
        const res = await this.get(`${this.API_URL}/books`);
        return res;
    }
    
    getBooks = async (id) => {
        const res = await this.get(`${this.API_URL}/books/${id}`);
        // console.log(res)
        return this._transformBook(res);;
    }

    _transformChar({name,gender,born,died,culture}) {
        return {
            name: name || this.noData,
            gender: gender || this.noData,
            born: born || this.noData,
            died: died || this.noData,
            culture: culture || this.noData
        }
    }
    _transformHouse({name,currentLord,region,founded,founder}) {
        return {
            name: name || this.noData,
            currentLord: currentLord || this.noData,
            region: region || this.noData,
            founded: founded || this.noData,
            founder: founder || this.noData
        }
    }
    _transformBook({name,authors,country,publisher,released}) {
        return {
            name: name || this.noData,
            authors: authors || this.noData,
            country: country || this.noData,
            publisher: publisher || this.noData,
            released: released || this.noData
        }
    }
}