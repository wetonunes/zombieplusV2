const { expect } = require('@playwright/test')

export class Movies {

    constructor(page) {
        this.page = page
    }

    async goForm() {
        // await this.page.locator('a[href="/admin/movies/register"]').click() //da forma comum
        await this.page.locator('a[href$="register"]').click() //usando regular expression
    }

    async submit() {
        await this.page.getByRole('button', {name:'cadastrar'}).click()
    }

    async create(title, overview, company, release_year) {

        await this.goForm()
        await this.page.locator('#title').fill(title)
        await this.page.locator('#overview').fill(overview)
        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: company }).click()
        await this.page.locator('#select_year .react-select__indicators').click()
        await this.page.locator('.react-select__option').filter({ hasText: release_year}).click()
        await this.submit()
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target);
    }
}