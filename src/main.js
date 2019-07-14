import {TitlePage, FormPage, EmailPage, Pages} from "./page-model";
import {TestData} from "./data-helper";

// page without en/ redirects to 'en' instead of en, which causes testcafe to fail with 404, because
// https://fenmar.github.io/ef-hotelbooking/'en' is not found
// TODO fix the redirect, then remove en/
var pageUrl = 'https://fenmar.github.io/ef-hotelbooking/en/';

fixture `Getting Started`
    .page(pageUrl);

test('T1: main URL shows title page in English', async t => {
    var p = new TitlePage(t);
    await p.checkLanguage();
});

test('T2: title page: switching language to German works', async t => {
    var p = new TitlePage(t);
    await p.switchToGerman();
    await p.checkLanguage();
});

test('T3: title page: switching language back to English works', async t => {
    var p = new TitlePage(t);
    await p.switchToGerman();
    await p.switchToEnglish();
    await p.checkLanguage();
});

test('T4: title page: continuing to the form page works', async t => {
    await Pages.progressToFormPage(t);
});

test('F1: form page: initial setup is sensible', async t => {
    var fp = await Pages.progressToFormPage(t);
    await fp.verifyRoomsizeAndFieldsEnabled(1);
    await fp.verifyInitialState();
});

test('F2: form page: filling in single room works, shows correct prices', async t => {
    var fp = await Pages.progressToFormPage(t);

    await TestData.fillFirstPerson(fp);
    await TestData.verifySingleRoomPrices(fp);
});

test('F3: form page: filling in double room works, shows correct prices', async t => {
    var fp = await Pages.progressToFormPage(t);
    await fp.setRoomsize(2);
    await fp.verifyRoomsizeAndFieldsEnabled(2);

    await TestData.fillFirstPerson(fp);
    await TestData.fillSecondPerson(fp);
    await TestData.verifyDoubleRoomPrices(fp);
});

test('F4: form page: filling in triple room works, shows correct prices', async t => {
    var fp = await Pages.progressToFormPage(t);
    await fp.setRoomsize(3);
    await fp.verifyRoomsizeAndFieldsEnabled(3);

    await TestData.fillFirstPerson(fp);
    await TestData.fillSecondPerson(fp);
    await TestData.fillThirdPerson(fp);
    await TestData.verifyTripleRoomPrices(fp);
});

test('F5: form page: can enter a long comment', async t => {
    var fp = await Pages.progressToFormPage(t);
    await TestData.enterLongComment(fp);
});

test('F6: form page: when disclaimer not accepted, get validation error and cannot generate email', async t => {
    var fp = await Pages.progressToFormPage(t);
    await TestData.fillFirstPerson(fp);

    // TODO customize alert message depending on validation results
    await fp.submitExpectingValidationError(TestData.expectedAlertMessage());
});
