//Exemplo com injecao de dependencias
const { test } = require('../support')

const data = require('../data/movie.json')
const {executeSQL} = require('../data/database')

test('deve poder cadastrar um novo filme', async ({ page }) => {
    // await page.goto('https://google.com')
    // // await page.landing.visit()
    // await page.waitForTimeout(2000)

    //Pode ser utilizado faker
    const movie = data.a_noite_dos_mortos_vivos
    executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)

    //deve estar logado com admnistrador
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com','pwd123')
    await page.login.isLoggedIn()

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)
    await page.toast.containText('UhullCadastro realizado com sucesso!')

})

test('não deve cadastrar quando os campo obrigatórios não são preenchidos', async ({ page }) => {   

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com','pwd123')
    await page.login.isLoggedIn()

    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])
})