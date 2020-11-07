import { USER_BASE } from '../config';
export const FETCH_LOGIN = 'FETCH_LOGIN';

export const fetchLogin = (userInput) => {
    return {
        type: FETCH_LOGIN,
        payload: new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${USER_BASE}/signin`, {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify(userInput),
                })
                const data = await response.json();
                resolve(data);
            } catch (error) {
                reject(error.message);
            }
        })
    }
}