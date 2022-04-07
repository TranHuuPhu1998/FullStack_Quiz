import { STORAGE_KEYS } from 'app-constants';

const getIsLoggedIn = () => localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true';

export default getIsLoggedIn;
