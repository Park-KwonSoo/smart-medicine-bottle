import { client } from './client';
import { RecoilState } from 'recoil';

export const userApi = {
    getMyInfo : (token : RecoilState<any>) => {
        return client.get('/user', {
            headers : {
                authorization : token,
            },
        });
    },
};