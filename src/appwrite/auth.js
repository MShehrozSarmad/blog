import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            userAccount ? this.loginAccount({ email, password }) : userAccount;
        } catch (error) {
            console.log('creating account :: appwrite service error :: error : ', error)
        }
    }

    async loginAccount({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log('login account :: appwrite service error :: error : ', error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log('getuser account :: appwrite service error :: error : ', error);
        }

        return null;
    }

    async logOut() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log('logout account :: appwrite service error :: error : ', error);
        }
    }
}

const authService = new AuthService();

export default authService;