import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const token = atom({
    key : 'token',
    default : null,
    effects_UNSTABLE : [persistAtom],
});

export const userType = atom({
    key : 'userType',
    default : 'NORMAL',
    effects_UNSTABLE : [persistAtom],
});