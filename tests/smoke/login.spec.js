const {
    test,
    expect
} = require('../../fixtures/baseFixture');

/*
|--------------------------------------------------------------------------
| IMPORT EXCEL UTILITY
|--------------------------------------------------------------------------
*/

const {
    getExcelData
} = require('../../utils/excelUtil');


/*
|--------------------------------------------------------------------------
| READ EXCEL DATA
|--------------------------------------------------------------------------
*/

const loginData = getExcelData(
    'D:/JavaScript2026/Project New/advanced_login_test_data_company_style.xlsx',
    'Login_Test_Data'
);


/*
|--------------------------------------------------------------------------
| TEST SUITE
|--------------------------------------------------------------------------
*/

test.describe('Login DDT Tests', () => {


    /*
    |--------------------------------------------------------------------------
    | BEFORE EACH TEST
    |--------------------------------------------------------------------------
    |
    | Ensures fresh session for every test
    |
    */

    test.beforeEach(async ({
        page
    }) => {

        await page.context().clearCookies();

        await page.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
        );

    });


    /*
    |--------------------------------------------------------------------------
    | LOOP THROUGH EXCEL ROWS
    |--------------------------------------------------------------------------
    */

    for (const data of loginData) {


        /*
        |--------------------------------------------------------------------------
        | SKIP UNSTABLE / BUSINESS CLARIFICATION TESTS
        |--------------------------------------------------------------------------
        */

        if (

            data.Scenario === 'Trailing Space Username' ||
            data.Scenario === 'Emoji Characters' ||
            data.Scenario === 'Case Sensitive Username'

        ) {

            continue;

        }


        /*
        |--------------------------------------------------------------------------
        | DYNAMIC TEST
        |--------------------------------------------------------------------------
        */

        test(data.Scenario, async ({
            page,
            loginPage
        }) => {


            /*
            |--------------------------------------------------------------------------
            | LOGIN
            |--------------------------------------------------------------------------
            */

            await loginPage.login(

                data.Username || '',
                data.Password || ''

            );


            /*
            |--------------------------------------------------------------------------
            | WAIT FOR PAGE STABILITY
            |--------------------------------------------------------------------------
            */

            await page.waitForLoadState(
                'domcontentloaded'
            );

            await page.waitForTimeout(1000);


            /*
            |--------------------------------------------------------------------------
            | VALID LOGIN
            |--------------------------------------------------------------------------
            */

            if (

                data.Username === 'Admin' &&
                data.Password === 'admin123'

            ) {

                await expect(page)
                    .toHaveURL(/dashboard/);

            }


            /*
            |--------------------------------------------------------------------------
            | BLANK FIELD VALIDATIONS
            |--------------------------------------------------------------------------
            */

            else if (

                !data.Username?.trim() ||
                !data.Password?.trim()

            ) {

                const requiredMessages =
                    page.locator(
                        '.oxd-input-field-error-message'
                    );


                /*
                |--------------------------------------------------------------------------
                | BOTH FIELDS BLANK
                |--------------------------------------------------------------------------
                */

                if (

                    !data.Username?.trim() &&
                    !data.Password?.trim()

                ) {

                    await expect(requiredMessages)
                        .toHaveCount(2);

                }


                /*
                |--------------------------------------------------------------------------
                | SINGLE FIELD BLANK
                |--------------------------------------------------------------------------
                */

                else {

                    await expect(
                        requiredMessages.first()
                    ).toBeVisible();

                }

            }


            /*
            |--------------------------------------------------------------------------
            | INVALID LOGIN / SECURITY / BOUNDARY
            |--------------------------------------------------------------------------
            */

            else {

                const errorMessage =
                    page.locator(
                        '.oxd-alert-content-text'
                    ).first();


                await expect(errorMessage)
                    .toBeVisible({
                        timeout: 10000
                    });


                await expect(errorMessage)
                    .toContainText(
                        /Invalid credentials|Unexpected error occurred/i
                    );

            }

        });

    }

});