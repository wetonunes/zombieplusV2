const {expect} = require('@playwright/test');

export class Leads {
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('http://localhost:3000');
    }

    async openLeadModel() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click();
        await expect(
          this.page.getByTestId('modal').getByRole('heading'))
          .toHaveText('Fila de espera');
    } 

    async submitLeadForm(nome, email) {
        await this.page.getByPlaceholder('Informe seu nome').fill(nome);
        await this.page.getByPlaceholder('Informe seu email').fill(email);
        // await page.getByText('Quero entrar na fila!').click();
        //Exemplo com escopo busca o texto no modal e não na página html
        await this.page.getByTestId('modal')
            .getByText('Quero entrar na fila!').click();
    }
    
    async toastHaveText(message) { 
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

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target);
    }
}
