import { request } from '@playwright/test';

export class APIClient {

    static async createContext() {

        return await request.newContext({

            baseURL:
                'https://opensource-demo.orangehrmlive.com'
        });
    }
}