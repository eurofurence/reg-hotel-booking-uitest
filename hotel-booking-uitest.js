import { TitlePage, FormPage, EmailPage } from "./page-model";

// page without en/ redirects to 'en' instead of en, which causes testcafe to fail with 404, because
// https://fenmar.github.io/ef-hotelbooking/'en' is not found
// TODO fix the redirect, then remove en/
var pageUrl = 'https://fenmar.github.io/ef-hotelbooking/en/';

fixture `Getting Started`
    .page(pageUrl);

test('T1: When accessing the main URL, the title page is shown in English', async t => {
    var p = new TitlePage(t);
    await p.checkLanguage();
});

test('T2: On the title page, switching language to German works', async t => {
    var p = new TitlePage(t);
    await p.switchToGerman();
    await p.checkLanguage();
});

test('T3: On the title page, switching language back to English works', async t => {
    var p = new TitlePage(t);
    await p.switchToGerman();
    await p.switchToEnglish();
    await p.checkLanguage();
});

test('T4: On the title page, continuing to the form page works', async t => {
    var p = new TitlePage(t);
    await p.submit();
    var fp = p.toFormPage();
});

test('F1: On the form page, initial setup is sensible', async t => {
    var p = new TitlePage(t);
    await p.submit();
    var fp = p.toFormPage();
    await fp.verifyRoomsizeAndFieldsEnabled(1);
    await fp.verifyInitialState();
});

test('F2: On the form page, can enter info for single room and correct prices are shown', async t => {
    var p = new TitlePage(t);
    await p.submit();
    var fp = p.toFormPage();
    await fp.verifyRoomsizeAndFieldsEnabled(1);
    await fp.setName(1, 'John Tester1');
    await fp.setStreet(1, 'Teststraße 53');
    await fp.setCity(1, '12345 Berlin');
    await fp.setCountry(1, 'Germany');
    await fp.setEmail(1, 'uitester@mailinator.com');
    await fp.setPhone(1, '+49 111 1111 111');
    await fp.verifyPrice(1, "84,00");
    await fp.verifyPrice(2, "85,00");
    await fp.verifyPrice(3, "14,00");
});

test('F3: On the form page, can enter info for double room and correct prices are shown', async t => {
    var p = new TitlePage(t);
    await p.submit();
    var fp = p.toFormPage();
    await fp.setRoomsize(2);
    await fp.verifyRoomsizeAndFieldsEnabled(2);

    await fp.setName(1, 'John Tester1');
    await fp.setStreet(1, 'Teststraße 53');
    await fp.setCity(1, '12345 Berlin');
    await fp.setCountry(1, 'Germany');
    await fp.setEmail(1, 'uitester1@mailinator.com');
    await fp.setPhone(1, '+49 111 1111 111');

    await fp.setName(2, 'Paula Tester2');
    await fp.setStreet(2, 'Teststraße 54');
    await fp.setCity(2, '80123 München');
    await fp.setCountry(2, 'Germany');
    await fp.setEmail(2, 'uitester2@mailinator.com');
    await fp.setPhone(2, '0222 2222 222');

    await fp.verifyPrice(1, "99,00");
    await fp.verifyPrice(2, "100,00");
    await fp.verifyPrice(3, "15,00");
});


