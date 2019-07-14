import {TitlePage, FormPage, EmailPage, Pages} from "./page-model";
import {TestData} from "./data-helper";

var pageUrl = 'http://localhost:63342/reg-hotel-booking/';

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

test('F6: form page: accepting disclaimer required to generate email', async t => {
    var fp = await Pages.progressToFormPage(t);
    await TestData.fillFirstPerson(fp);

    // TODO customize alert message depending on validation results
    await fp.submitExpectingValidationError(TestData.expectedAlertMessage());
    await fp.verifyDisclaimerMarkedMissing();
});

test('F7: form page: switching from English to German works', async t => {
    var fp = await Pages.progressToFormPage(t);
    await TestData.fillFirstPerson(fp);
    // TODO set different dates and adapt check for them

    await fp.switchToGerman();
    // date does not convert to German format on lang change
    // TODO fix this
    await fp.checkLanguage('08/14/2019', '08/18/2019');
    // TODO check entered info retained
});

test('F8: form page: switching from German to English works', async t => {
    var fp = await Pages.progressToFormPage(t);
    await TestData.fillFirstPerson(fp);
    // TODO set different dates and adapt check for them

    await fp.switchToGerman();
    // TODO change date while in German format
    await fp.setRoomsize(2);
    await TestData.fillSecondPerson(fp);

    await fp.switchToEnglish();
    await fp.checkLanguage('08/14/2019', '08/18/2019');
    // TODO check entered info retained
});
