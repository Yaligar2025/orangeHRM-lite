export class AuthAPI {

    constructor(requestContext) {

        this.request = requestContext;
    }

    async login(payload) {

        return await this.request.post(
            '/web/index.php/auth/validate',
            {
                form: payload
            }
        );
    }
}