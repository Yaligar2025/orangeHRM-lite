class LoginPage {

    constructor(page) {

        this.page = page;

        /*
        |--------------------------------------------------------------------------
        | LOCATORS
        |--------------------------------------------------------------------------
        */

        this.usernameInput =
            page.locator(
                'input[name="username"]'
            );

        this.passwordInput =
            page.locator(
                'input[name="password"]'
            );

        this.loginButton =
            page.locator(
                'button[type="submit"]'
            );

        this.errorMessage =
            page.locator(
                '.oxd-alert-content-text'
            ).first();

    }


    /*
    |--------------------------------------------------------------------------
    | NAVIGATE TO LOGIN PAGE
    |--------------------------------------------------------------------------
    */

    async gotoLoginPage() {

        await this.page.goto(

            'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',

            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }

        );

        await this.page.waitForLoadState(
            'networkidle'
        );

    }


    /*
    |--------------------------------------------------------------------------
    | LOGIN METHOD
    |--------------------------------------------------------------------------
    */

    async login(username, password) {

        /*
        |--------------------------------------------------------------------------
        | CLEAR EXISTING VALUES
        |--------------------------------------------------------------------------
        */

        await this.usernameInput.clear();
        await this.passwordInput.clear();


        /*
        |--------------------------------------------------------------------------
        | ENTER CREDENTIALS
        |--------------------------------------------------------------------------
        */

        await this.usernameInput.fill(
            username || ''
        );

        await this.passwordInput.fill(
            password || ''
        );


        /*
        |--------------------------------------------------------------------------
        | CLICK LOGIN + WAIT
        |--------------------------------------------------------------------------
        */

        await Promise.all([

            this.page.waitForLoadState(
                'networkidle'
            ),

            this.loginButton.click()

        ]);

    }


    /*
    |--------------------------------------------------------------------------
    | VERIFY ERROR MESSAGE
    |--------------------------------------------------------------------------
    */

    async getErrorMessage() {

        await this.errorMessage.waitFor({

            state: 'visible',
            timeout: 10000

        });

        return await this.errorMessage.textContent();

    }


    /*
    |--------------------------------------------------------------------------
    | CHECK ERROR MESSAGE VISIBILITY
    |--------------------------------------------------------------------------
    */

    async isErrorMessageVisible() {

        return await this.errorMessage
            .isVisible()
            .catch(() => false);

    }

}

module.exports = LoginPage;

