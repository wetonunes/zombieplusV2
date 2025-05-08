const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  //const landingPage = new LadingPage(page);
  const leadName = faker.person.fullName(); 
  const leadEmail = faker.internet.email(); 

  await page.Leads.visit()
  await page.Leads.openLeadModel()
  await page.Leads.submitLeadForm(leadName,leadEmail)

  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await page.toast.containText(message);
});

test('Não deve cadastrar quando o email já existe', async ({ page, request }) => {
  //const landingPage = new LadingPage(page);
  const leadName = faker.person.fullName(); 
  const leadEmail = faker.internet.email(); 

  await request.post('http://localhost:3333/leads',{
    data: {
      name: leadName,
      email: leadEmail
    }
  }).then((response) => {
    expect(response.status()).toBe(201);
  })

  await page.Leads.visit()
  await page.Leads.openLeadModel()
  await page.Leads.submitLeadForm(leadName,leadEmail)

  const message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera.";
  await page.toast.containText(message);
});

test('Email incorreto', async ({ page }) => {
  //const landingPage = new LadingPage(page);

  await page.Leads.visit();
  await page.Leads.openLeadModel();
  await page.Leads.submitLeadForm('Welington M S Nunes','wetonunes,gmail.com' );
  await page.Leads.alertHaveText('Email incorreto');
});

test('Nome não é preenchido', async ({ page }) => {
  //const landingPage = new LadingPage(page);

  await page.Leads.visit();
  await page.Leads.openLeadModel();
  await page.Leads.submitLeadForm('','wetonunes@gmail.com');
  await page.Leads.alertHaveText('Campo obrigatório');
});

test('Email não é preenchido', async ({ page }) => {
  //const landingPage = new LadingPage(page);

  await page.Leads.visit();
  await page.Leads.openLeadModel();
  await page.Leads.submitLeadForm('Welington M S Nunes','');
  await page.Leads.alertHaveText('Campo obrigatório');
});

test('Nome e email não é preenchido', async ({ page }) => {
  //const landingPage = new LadingPage(page);

  await page.Leads.visit();
  await page.Leads.openLeadModel();
  await page.Leads.submitLeadForm('','');
  await page.Leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});

