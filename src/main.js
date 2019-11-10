import {TitlePage, FormPage, EmailPage, Pages} from "./page-model";
import {TestData} from "./data-helper";

var pageUrl = 'http://localhost:63342/reg-hotel-booking/';

fixture `Getting Started`
    .page(pageUrl);

test('T1: main URL shows title page in English', async t => {
    const p = new TitlePage(t);
    await p.checkLanguage();
});

test('T2: title page: switching language to German works', async t => {
    const p = new TitlePage(t);
    await p.switchToGerman();
    await p.checkLanguage();
});

test('T3: title page: switching language back to English works', async t => {
    const p = new TitlePage(t);
    await p.switchToGerman();
    await p.switchToEnglish();
    await p.checkLanguage();
});

test('T4: title page: continuing to the form page works', async t => {
    await Pages.progressToFormPage(t);
});

test('F1: form page: initial setup is sensible', async t => {
    const fp = await Pages.progressToFormPage(t);
    await fp.verifyRoomsizeAndFieldsEnabled(1);
    await fp.verifyInitialState();
});

test('F2: form page: filling in single room works, shows correct prices', async t => {
    const fp = await Pages.progressToFormPage(t);

    await TestData.fillFirstPerson(fp);
    await TestData.verifySingleRoomPrices(fp);
});

test('F3: form page: filling in double room works, shows correct prices', async t => {
    const fp = await Pages.progressToFormPage(t);
    await fp.setRoomsize(2);
    await fp.verifyRoomsizeAndFieldsEnabled(2);

    await TestData.fillFirstPerson(fp);
    await TestData.fillSecondPerson(fp);
    await TestData.verifyDoubleRoomPrices(fp);
});

test('F4: form page: filling in triple room works, shows correct prices', async t => {
    const fp = await Pages.progressToFormPage(t);
    await fp.setRoomsize(3);
    await fp.verifyRoomsizeAndFieldsEnabled(3);

    await TestData.fillFirstPerson(fp);
    await TestData.fillSecondPerson(fp);
    await TestData.fillThirdPerson(fp);
    await TestData.verifyTripleRoomPrices(fp);
});

test('F5: form page: can enter a long comment', async t => {
    const fp = await Pages.progressToFormPage(t);
    await TestData.enterLongComment(fp);
});

test('F6: form page: accepting disclaimer required to generate email', async t => {
    const fp = await Pages.progressToFormPage(t);
    await TestData.fillFirstPerson(fp);

    await fp.submitExpectingValidationError(TestData.expectedAlertMessage(fp));
    await fp.verifyDisclaimerMarkedMissing();
});

test('F7: form page: switching from English to German works', async t => {
    const fp = await Pages.progressToFormPage(t);
    await TestData.fillFirstPerson(fp);
    await TestData.setDates(fp);
    await fp.checkLanguage(TestData.expectedArrival(fp), TestData.expectedDeparture(fp));

    await fp.switchToGerman();
    await fp.checkLanguage(TestData.expectedArrival(fp), TestData.expectedDeparture(fp));
    // check that data has been retained through language switch
    await TestData.verifyFirstPerson(fp);
});

test('F8: form page: switching from German to English works', async t => {
    const fp = await Pages.progressToFormPage(t);
    await TestData.fillFirstPerson(fp);
    await fp.checkLanguage(TestData.defaultArrival(fp), TestData.defaultDeparture(fp));

    await fp.switchToGerman();
    // now change date while in German format
    await TestData.setDates(fp);
    await fp.setRoomsize(2);
    await TestData.fillSecondPerson(fp);
    await fp.checkLanguage(TestData.expectedArrival(fp), TestData.expectedDeparture(fp));

    await fp.switchToEnglish();
    await fp.checkLanguage(TestData.expectedArrival(fp), TestData.expectedDeparture(fp));
    // check that data has been retained through language switch back
    await TestData.verifyFirstPerson(fp);
    await TestData.verifySecondPerson(fp);
});

test('F9: form page: filling all required fields makes email generation available', async t => {
    const fp = await Pages.progressToFormPage(t);
    await TestData.fillFirstPerson(fp);
    await fp.acceptDisclaimer();
    await fp.submit();
});

test('F10: form page: 1st person fields mandatory', async t => {
    const fp = await Pages.progressToFormPage(t);
    await fp.verifyPersonFieldsHaveError(1);
});

test('F11: form page: 2nd, 3rd person fields optional', async t => {
    const fp = await Pages.progressToFormPage(t);
    await fp.setRoomsize(3);
    await TestData.fillFirstPerson(fp);

    await fp.verifyPersonFieldsHaveNoError(1);
    await fp.verifyPersonFieldsHaveNoError(2);
    await fp.verifyPersonFieldsHaveNoError(3);
});

test('F12: form page: comment length limit', async t => {
    const fp = await Pages.progressToFormPage(t);
    await TestData.enterLongComment(fp);
    await fp.verifyCommentHasNoError();

    await TestData.enterLongComment(fp, 20);
    await fp.verifyCommentHasError();
});

// TODO implement test cases E1 - E14 (partially done)

test('E1: email page: before secret is revealed', async t => {
    const fp = await Pages.progressToFormPage(t);
    await TestData.fillFirstPerson(fp);
    await fp.acceptDisclaimer();
    await fp.submit();

    // here we do not use the automated testing override - should lead to "not ready" until it is too late anyway
    const ep = fp.toEmailPage();
    await ep.verifyNotReady();

    // TODO implement more checks (secret NOT shown, To: hidden)
});

test('E2: email page: after secret is revealed', async t => {
    const fp = await Pages.progressToFormPage(t);
    await fp.setAutomatedTestOverride();
    await TestData.fillFirstPerson(fp);
    await fp.acceptDisclaimer();
    await fp.submit();

    const ep = fp.toEmailPage();
    await ep.verifyReady();

    // TODO implement more checks (secret shown, To: visible)
});
