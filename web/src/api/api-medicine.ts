import { client } from './client';

export default {
    searchMedicine : (token : any, keyword : string) => {
        return client.get('/medicine', {
            headers : {
                Authorization : token,
            },
            params : {
                keyword,
            },
        });
    },
}