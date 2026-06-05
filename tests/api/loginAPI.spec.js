import { test, expect } from '@playwright/test';

import { APIClient }
from '../../api/helpers/apiClient';

import { AuthAPI }
from '../../api/endpoints/authAPI';

import { loginPayload }
from '../../api/payloads/loginPayload';

test(
'Login API Test',
async () => {

    const requestContext =
        await APIClient.createContext();

    const authAPI =
        new AuthAPI(requestContext);

    const response =
        await authAPI.login(
            loginPayload
        );

    console.log(
        response.status()
    );

    expect(
        response.status()
    ).toBe(200);
});