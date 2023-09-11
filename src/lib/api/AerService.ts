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

    async getAddressLookup(postal_code: string, housenumber: string){
        try {
            const response = await this.httpClient.get(`/api/address/lookup?postal_code=${postal_code}&housenumber=${housenumber}`)
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async postMutationAddress(data: IPostMutationAddress ){
        try {
            const response = await this.httpClient.post('/api/mutations/address', data)
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getDocument (id: string){
        try {
            const response = await fetch(`/api/documents/${id}`);
            const contentType = response.headers.get("content-type");
            if (contentType?.startsWith("application/pdf")) {
              const blob = await response.blob();
              // Introduce a 1-second delay before setting the data
             const file = URL.createObjectURL(blob)
                return file
            } 
          } catch (error) {
          }
        }
       
        async postDocumentData(data: any){
            try {
                const response = await this.httpClient.post('/api/documents', data);
                return response;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }

        async postNewsData(data: any){
            try {
                const response = await this.httpClient.post('/api/news', data);
                return response;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }

        async postNewAnouncment(data: any){
            try {
                const response = await this.httpClient.post('/api/announcements', data);
                return response;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        async deleteAnouncment(data: any){
            try {
                const response = await this.httpClient.delete('/api/announcements', data);
                return response;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
}

export default AerService

