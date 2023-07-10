import { CollapsibleListItemProps } from "../../components/CollapsibleListItem"

export interface IPostMutationAddress {
    relation_id: string,
    postal_code: string,
    housenumber: number,
}
class AerService {
    httpClient: any

    constructor(httpClient:any) {
        this.httpClient = httpClient
    }

    async getRelationsId(id: string | undefined){
        try {
            const response = await this.httpClient.get(`/api/relations/${id}`)
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getRelations(){
        try {
            const response = await this.httpClient.get('/api/relations/search')
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getAnnouncements(){
        try {
            const response = await this.httpClient.get('/api/announcements')
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getAnnouncementPublic(){
        try {
            const response = await this.httpClient.get(`/api/announcements/public`)
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getFaqPublic(){
        try {
            const response: CollapsibleListItemProps[] = await this.httpClient.get(`/api/faqs/public`)
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getNewsPublic(){
        try {
            const response = await this.httpClient.get(`/api/news/public`)
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getNews(){
        try {
            const response = await this.httpClient.get('/api/news')
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getSessionInit(){
        try {
            const response = await this.httpClient.get('/api/sessions/init')
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async postMutationAddress(data: IPostMutationAddress ){
        try {
            const response = await this.httpClient.post('/api/mutations/address', data)
            console.log(response)
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}

export default AerService