import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  const uniqueUsername = `testuser_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
  const newUser = {
    name: `Test User - ${uniqueUsername}`,
    email: `${uniqueUsername}@example.com`,
    username: uniqueUsername,
    password: uniqueUsername,
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });



//--------------- First Test ---------------//

  test('Can create a new user and redirect to home page', async ({ page }) => {
    await page.getByTestId('go_to_create_user_button').click();

    await page.getByTestId('create_user_form_name').fill(newUser.name);
    await page.getByTestId('create_user_form_email').fill(newUser.email);
    await page.getByTestId('create_user_form_username').fill(newUser.username);
    await page.getByTestId('create_user_form_password').fill(newUser.password);
    await page.getByTestId('create_user_form_create_user').click();
    
  
    const [response] = await Promise.all([

      page.waitForResponse((resp) =>
        resp.url().includes('/users') && resp.status() === 201
      ),
      page.getByTestId('create_user_form_create_user').click(),
    ]);

    expect(page.url()).toContain('/'); // Home after redirect
    await expect(page.getByTestId('go_to_login_button')).toBeVisible();
  });



//--------------- second Test ---------------//


  test('Can login with valid credentials and logout', async ({ page }) => {
    await page.getByTestId('go_to_login_button').click();

    await page.getByTestId('login_form_username').fill(newUser.username);
    await page.getByTestId('login_form_password').fill(newUser.password);

    const [response] = await Promise.all([
      page.waitForResponse((resp) =>
        resp.url().includes('/login') && resp.status() === 200
      ),
      page.getByTestId('login_form_login').click(),
    ]);

    await expect(page.getByTestId('logout')).toBeVisible();
  });



//--------------- Third Test ---------------//

  test('Shows error message on invalid login', async ({ page }) => {
    await page.getByTestId('go_to_login_button').click();

    await page.getByTestId('login_form_username').fill('wronguser');
    await page.getByTestId('login_form_password').fill('wrongpass');

    await page.getByTestId('login_form_login').click();
    await expect(page.locator('text=Invalid username or password')).toBeVisible();
  });


//--------------- Forth Test ---------------//

  test('Shows error when user creation fails', async ({ page }) => {
    await page.getByTestId('go_to_create_user_button').click();

    // Try creating the same user again (assuming username must be unique)
    await page.getByTestId('create_user_form_name').fill(newUser.name);
    await page.getByTestId('create_user_form_email').fill(newUser.email);
    await page.getByTestId('create_user_form_username').fill(newUser.username);
    await page.getByTestId('create_user_form_password').fill(newUser.password);

    await page.getByTestId('create_user_form_create_user').click();
    await expect(page.locator('text=Failed to create user')).toBeVisible();
  });
});



