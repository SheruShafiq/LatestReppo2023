import { CRS } from 'leaflet';
import { store } from '../redux/store';

const AerClient = {
    async get(url: string){
        console.log(url)
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'X-CSRF-Token': store.getState().session.csrf,
                'Content-Type': 'application/json',
            }
        })
        store.dispatch({type: 'session/setSessionExpiresAt', payload: data.headers.get('X-Session-Expires') || ''})
        return data.json()
    },

    async post(url: string, body:any){
        console.log('csrfToken: ', store.getState().session.csrf)
        const data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'X-CSRF-Token': store.getState().session.csrf,
                'Content-Type': 'application/json'
            }
        })
        store.dispatch({type: 'session/setSessionExpiresAt', payload: data.headers.get('X-Session-Expires') || ''})
        // return data
    }
}

export default AerClient