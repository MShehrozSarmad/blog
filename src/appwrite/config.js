import conf from "../conf/conf";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class DbService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImg, status, userId, author }) {
        try {
            slug = slug.substring(0, 36).replace(/[^a-zA-Z0-9._-]/g, '');
            if (!/^[a-zA-Z0-9]/.test(slug)) {
                slug = 'a' + slug.substring(1);
            }

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImg: featuredImg,
                    status,
                    userId,
                    author
                }
            )
        } catch (error) {
            console.log('create post :: appwrite service :: error : ', error);
        }
    }

    async updatePost(slug, { title, content, featuredImg, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status
                }
            )
        } catch (error) {
            console.log('update post :: appwrite service :: error : ', error);
        }
    }

    async delPost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log('delete post :: appwrite service :: error : ', error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        } catch (error) {
            console.log('get post :: appwrite service :: error : ', error);
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log('get posts :: appwrite service :: error : ', error);
            return false;

        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('upload file :: appwrite service :: error : ', error);
            return false;
        }
    }

    async delFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log('delete file :: appwrite service :: error : ', error);
            return false;
        }
    }

    previewFile(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const dbService = new DbService();

export default dbService;