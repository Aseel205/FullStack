# Test info

- Name: Authentication >> Can create a new user and redirect to home page
- Location: C:\Users\aseel\OneDrive\Desktop\6th semester\FullStack\assigments\FullStack-hw3\frontend\playwright-tests\test.spec.ts:20:3

# Error details

```
Error: locator.click: Test ended.
Call log:
  - waiting for getByTestId('create_user_form_create_user')
    - locator resolved to <button type="submit" data-testid="create_user_form_create_user">Create User</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable

    at C:\Users\aseel\OneDrive\Desktop\6th semester\FullStack\assigments\FullStack-hw3\frontend\playwright-tests\test.spec.ts:35:56
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Authentication', () => {
   4 |   const uniqueUsername = `testuser_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
   5 |   const newUser = {
   6 |     name: `Test User - ${uniqueUsername}`,
   7 |     email: `${uniqueUsername}@example.com`,
   8 |     username: uniqueUsername,
   9 |     password: uniqueUsername,
  10 |   };
  11 |
  12 |   test.beforeEach(async ({ page }) => {
  13 |     await page.goto('http://localhost:5173/');
  14 |   });
  15 |
  16 |
  17 |
  18 | //--------------- First Test ---------------//
  19 |
  20 |   test('Can create a new user and redirect to home page', async ({ page }) => {
  21 |     await page.getByTestId('go_to_create_user_button').click();
  22 |
  23 |     await page.getByTestId('create_user_form_name').fill(newUser.name);
  24 |     await page.getByTestId('create_user_form_email').fill(newUser.email);
  25 |     await page.getByTestId('create_user_form_username').fill(newUser.username);
  26 |     await page.getByTestId('create_user_form_password').fill(newUser.password);
  27 |     await page.getByTestId('create_user_form_create_user').click();
  28 |     
  29 |   
  30 |     const [response] = await Promise.all([
  31 |
  32 |       page.waitForResponse((resp) =>
  33 |         resp.url().includes('/users') && resp.status() === 201
  34 |       ),
> 35 |       page.getByTestId('create_user_form_create_user').click(),
     |                                                        ^ Error: locator.click: Test ended.
  36 |     ]);
  37 |
  38 |     expect(page.url()).toContain('/'); // Home after redirect
  39 |     await expect(page.getByTestId('go_to_login_button')).toBeVisible();
  40 |   });
  41 |
  42 |
  43 |
  44 | //--------------- second Test ---------------//
  45 |
  46 |
  47 |   test('Can login with valid credentials and logout', async ({ page }) => {
  48 |     await page.getByTestId('go_to_login_button').click();
  49 |
  50 |     await page.getByTestId('login_form_username').fill(newUser.username);
  51 |     await page.getByTestId('login_form_password').fill(newUser.password);
  52 |
  53 |     const [response] = await Promise.all([
  54 |       page.waitForResponse((resp) =>
  55 |         resp.url().includes('/login') && resp.status() === 200
  56 |       ),
  57 |       page.getByTestId('login_form_login').click(),
  58 |     ]);
  59 |
  60 |     await expect(page.getByTestId('logout')).toBeVisible();
  61 |   });
  62 |
  63 |
  64 |
  65 | //--------------- Third Test ---------------//
  66 |
  67 |   test('Shows error message on invalid login', async ({ page }) => {
  68 |     await page.getByTestId('go_to_login_button').click();
  69 |
  70 |     await page.getByTestId('login_form_username').fill('wronguser');
  71 |     await page.getByTestId('login_form_password').fill('wrongpass');
  72 |
  73 |     await page.getByTestId('login_form_login').click();
  74 |     await expect(page.locator('text=Invalid username or password')).toBeVisible();
  75 |   });
  76 |
  77 |
  78 | //--------------- Forth Test ---------------//
  79 |
  80 |   test('Shows error when user creation fails', async ({ page }) => {
  81 |     await page.getByTestId('go_to_create_user_button').click();
  82 |
  83 |     // Try creating the same user again (assuming username must be unique)
  84 |     await page.getByTestId('create_user_form_name').fill(newUser.name);
  85 |     await page.getByTestId('create_user_form_email').fill(newUser.email);
  86 |     await page.getByTestId('create_user_form_username').fill(newUser.username);
  87 |     await page.getByTestId('create_user_form_password').fill(newUser.password);
  88 |
  89 |     await page.getByTestId('create_user_form_create_user').click();
  90 |     await expect(page.locator('text=Failed to create user')).toBeVisible();
  91 |   });
  92 | });
  93 |
  94 |
  95 |
  96 |
```