const { expect } = require('@playwright/test')
export class login {

    constructor(page) {
        this.page = page
    }

    async do(email, password) {
        await this.visit()
        await this.submit(email, password)  
        await this.isLoggedIn()
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submit(email, password) {  
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.locator('//button[text()="Entrar"]').click() //usando xpath
        //await this.page.getByText('Entrar').click() //usando selector de texto
    }

    async haveText(message) { 
        //Recurso para identificar o modal
        // await page.getByText("Seus dados conosco").click();
        // const content =  await page.content();
        // console.log(content);        
        
        const toast = this.page.locator('.toast');

        await expect(toast).toHaveText(message);
        //garante que o elemento não faz parte do HTML, ataxado ao código.
        // await expect(toast).toBeHidden({timeout: 5000});
        //garante que o elemento não está visivel mais pode existir no HTML com uma propriedade que deixa oculto
        await expect(toast).toBeVisible({timeout: 5000});
    }  

    //Opçoes de como fazer o alert para classes diferentes
    //Opcao 1
    async alertEmailHaveText(text) { 
        const alert = this.page.locator('.email-alert');
        await expect(alert).toHaveText(text);
    }

    async alertPasswordHaveText(text) { 
        const alert = this.page.locator('.password-alert');
        await expect(alert).toHaveText(text);
    }
    //Opcao 2
    async alertHaveText(text) { 
        const alert = this.page.locator('span[class$=alert]');
        await expect(alert).toHaveText(text);
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle') //o netwokidle identifica que o tráfico na rede parou
        await expect(this.page).toHaveURL(/.*admin/)
    }
}