import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const token = atom({
    key : 'token',
    default : null,
    effects_UNSTABLE : [persistAtom],
});

export const userId = atom({
    key : 'userId',
    default : null,
    effects_UNSTABLE : [persistAtom],
});

export const userTypeCd = atom({
    key : 'userTypeCd',
    default : 'NORMAL',
    effects_UNSTABLE : [persistAtom],
});

export const loading = atom({
    key : 'loading',
    default : false,
    effects_UNSTABLE : [persistAtom],
});