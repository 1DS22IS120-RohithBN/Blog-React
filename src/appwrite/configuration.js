import config from '../config/config'
import { Client,ID,Databases,Storage,Query } from 'appwrite'

export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectId)
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
                userId
            })
        } catch (error) {
            console.log(error)    
        }
    }

    async updatePost(slug,{title,content,featuredImage,status,userId}){
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
                userId
             })
            
        } catch (error) {
            console.log(error) 
        }
    }

   // Assuming you are using a class-based service
async deletePost(slug) {
    try {
        await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
        
    } catch (error) {
        console.log("Error deleting post:", error);
        return false;
    }
}

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,config.appwriteCollectionId,slug
            )}
            catch(error){
                console.log(error)
                return false;
            }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(config.appwriteDatabaseId,config.appwriteCollectionId,queries)
            }
            catch(error){
                console.log(error)
                return false;
                }
                

    }

    async uploadFile(file){
        try {
           return await this.bucket.createFile(config.appwriteBucketId,ID.unique(),file)
        }
        catch(error){
            console.log(error)
            return false;
        }
    }
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(config.appwriteBucketId,fileId)
            }
            catch(error){
                console.log(error)
                return false;
                }
    }
    getFilePreview(fileId){
        if (!fileId) {
            console.warn("No fileId provided for getFilePreview");
            return ''; // Or a placeholder image URL
          }
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}


const service=new Service();
export default  service;