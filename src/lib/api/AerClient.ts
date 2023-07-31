import { store } from '../redux/store';

const AerClient = {
    async get(url: string){
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'X-CSRFToken': store.getState().session.csrf,
                'Content-Type': 'application/json',
            }
        })
        store.dispatch({type: 'session/setSessionExpiresAt', payload: data.headers.get('X-Session-Expires') || ''})
        return data.json()
    },

    async post(url: string, body:any){
        const data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'X-CSRFToken': store.getState().session.csrf,
                'Content-Type': 'application/json'
            }
        })
        store.dispatch({type: 'session/setSessionExpiresAt', payload: data.headers.get('X-Session-Expires') || ''})
        return data.json()
    }
}

export default AerClient