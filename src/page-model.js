import {ClientFunction, Selector} from 'testcafe';

export class TitlePage {
    constructor(t) {
        this.t = t;
        this.language = 'en';

        this.getLocation = ClientFunction(() => document.location.href);

        this.navs = {
            submitButton: Selector('#submitbutton'),
            languageDropdown: Selector('#language_dropdown_toggle'),
            englishButton: Selector('#language_en'),
            germanButton: Selector('#language_de'),
        };
        this.labels = {
            textHeadline: Selector('#text_headline'),
        };
    }

    async switchToGerman() {
        this.language = 'de';
        await this.t
            .click(this.navs.languageDropdown)
            .click(this.navs.germanButton);
    }

    async switchToEnglish() {
        this.language = 'en';
        await this.t
            .click(this.navs.languageDropdown)
            .click(this.navs.englishButton);
    }

    async checkLanguage() {
        var expectedHeadline = this.language === 'en' ?
            'Booking a Hotel Room for Eurofurence' :
            'Hotelbuchung für Eurofurence';

        await this.t
            .expect(this.getLocation()).contains('/' + this.language + '/')
            .expect(this.labels.textHeadline.innerText).contains(expectedHeadline);
    }

    async submit() {
        await this.t
            .click(this.navs.submitButton)
            .expect(this.getLocation()).contains('/' + this.language + '/reservation-form.html');
    }

    toFormPage() {
        return new FormPage(this.t, this.language);
    }
}

export class FormPage {
    constructor(t, language) {
        this.t = t;
        this.language = language;

        this.getLocation = ClientFunction(() => document.location.href);

        this.navs = {
            languageDropdown: Selector('#language_dropdown_toggle'),
            englishButton: Selector('#language_en'),
            germanButton: Selector('#language_de'),
            submitButton: Selector('#submitbutton'),
        };
        this.labels = {
            roomsize: Selector('#roomsize_label'),
            roomsizes: [Selector('#size_single_label'), Selector('#size_double_label'), Selector('#size_triple_label')],
            name: Selector('label[for="name1"]'),
            street: Selector('label[for="street1"]'),
            city: Selector('label[for="city1"]'),
            country: Selector('label[for="country1"]'),
            email: Selector('label[for="email1"]'),
            phone: Selector('label[for="phone1"]'),
            dates: Selector('label[for="arrival"]'),
            roomtype: Selector('#roomtype_label'),
            roomtypes: [Selector('#roomtype1button'), Selector('#roomtype2button'), Selector('#roomtype3button')],
            price: [Selector('#roomtype1price'), Selector('#roomtype2price'), Selector('#roomtype3price')],
            footnote: Selector('#footnote_label'),
            disclaimerError: Selector('#understood_error'),
        };
        this.fields = {
            // remember, you need to click the label, not the field, for radio buttons
            roomsizes: [Selector('#size_single'), Selector('#size_double'), Selector('#size_triple')],
            name: [Selector('#name1'), Selector('#name2'), Selector('#name3')],
            street: [Selector('#street1'), Selector('#street2'), Selector('#street3')],
            city: [Selector('#city1'), Selector('#city2'), Selector('#city3')],
            country: [Selector('#country1'), Selector('#country2'), Selector('#country3')],
            email: [Selector('#email1'), Selector('#email2'), Selector('#email3')],
            phone: [Selector('#phone1'), Selector('#phone2'), Selector('#phone3')],
            arrival: Selector('#arrival'),
            departure: Selector('#departure'),
            // remember, you need to click the label, not the field, for radio buttons
            roomtypes: [Selector('#roomtype1'), Selector('#roomtype2'), Selector('#roomtype3')],
            comment: Selector('#comments'),
            disclaimer: Selector('#understood'),
        };
    }

    async setRoomsize(sizeNo) {
        await this.t
            .click(this.labels.roomsizes[sizeNo - 1]);
    }

    async _verifyInputDisabledState(selector, isDisabled) {
        if (isDisabled) {
            await this.t.expect(selector.hasAttribute('disabled')).ok();
        } else {
            await this.t.expect(selector.hasAttribute('disabled')).notOk();
        }
    }

    async verifyRoomsizeAndFieldsEnabled(sizeNo) {
        var shouldBeDisabled = [false, (sizeNo < 2), (sizeNo < 3)];
        for (var i = 0; i < 3; i++) {
            await this._verifyInputDisabledState(this.fields.name[i], shouldBeDisabled[i]);
            await this._verifyInputDisabledState(this.fields.street[i], shouldBeDisabled[i]);
            await this._verifyInputDisabledState(this.fields.city[i], shouldBeDisabled[i]);
            await this._verifyInputDisabledState(this.fields.country[i], shouldBeDisabled[i]);
            await this._verifyInputDisabledState(this.fields.email[i], shouldBeDisabled[i]);
            await this._verifyInputDisabledState(this.fields.phone[i], shouldBeDisabled[i]);
        }
    }

    async verifyInitialState() {
        await this.t
            .expect(this.fields.roomsizes[0].checked).eql(true)
            .expect(this.fields.roomsizes[1].checked).eql(false)
            .expect(this.fields.roomsizes[2].checked).eql(false)
            .expect(this.fields.arrival.value).eql('08/14/2019')
            .expect(this.fields.departure.value).eql('08/18/2019')
            .expect(this.fields.roomtypes[0].checked).eql(true)
            .expect(this.fields.roomtypes[1].checked).eql(false)
            .expect(this.fields.roomtypes[2].checked).eql(false)
            .expect(this.fields.disclaimer.checked).notOk()
    }

    async setName(personNo, value) {
        await this.t
            .typeText(this.fields.name[personNo - 1], value, {paste: true});
    }

    async setStreet(personNo, value) {
        await this.t
            .typeText(this.fields.street[personNo - 1], value, {paste: true});
    }

    async setCity(personNo, value) {
        await this.t
            .typeText(this.fields.city[personNo - 1], value, {paste: true});
    }

    async setCountry(personNo, value) {
        await this.t
            .typeText(this.fields.country[personNo - 1], value, {paste: true});
    }

    async setEmail(personNo, value) {
        await this.t
            .typeText(this.fields.email[personNo - 1], value, {paste: true});
    }

    async setPhone(personNo, value) {
        await this.t
            .typeText(this.fields.phone[personNo - 1], value, {paste: true});
    }

    async verifyPrice(roomtypeNo, valueString) {
        await this.t
            .expect(this.labels.price[roomtypeNo - 1].innerText).eql(valueString + " €*");
    }

    async setComment(value) {
        await this.t
            .typeText(this.fields.comment, value, {paste: true});
    }

    async submitExpectingValidationError(expectedAlertMessage) {
        await this.t
            .expect(this.navs.submitButton.getAttribute('class')).eql('btn btn-default')
            .setNativeDialogHandler(() => true)
            .click(this.navs.submitButton);

        const history = await this.t.getNativeDialogHistory();
        await this.t
            .expect(history[0].type).eql('alert')
            .expect(history[0].text).eql(expectedAlertMessage)
            .expect(this.getLocation()).notContains('reservation-show.html');
    }

    async verifyDisclaimerMarkedMissing() {
        await this.t
            .expect(this.labels.disclaimerError.getAttribute('class')).contains('has-error');
    }

    async switchToGerman() {
        this.language = 'de';
        await this.t
            .click(this.navs.languageDropdown)
            .click(this.navs.germanButton);
    }

    async switchToEnglish() {
        this.language = 'en';
        await this.t
            .click(this.navs.languageDropdown)
            .click(this.navs.englishButton);
    }

    async checkLanguage(expectedArrival, expectedDeparture) {
        var expected = {
            'en':{
                roomsize: 'Room Size',
            }, 'de':{
                roomsize: 'Anzahl Personen',
            }
        };

        await this.t
            .expect(this.getLocation()).contains('/' + this.language + '/')
            .expect(this.labels.roomsize.innerText).eql(expected[this.language].roomsize)
            .expect(this.fields.arrival.value).eql(expectedArrival)
            .expect(this.fields.departure.value).eql(expectedDeparture);
    }

    async acceptDisclaimer() {
        await this.t
            .click(this.fields.disclaimer)
            .expect(this.fields.disclaimer.checked).eql(true);
    }

    async submit() {
        await this.t
            .expect(this.navs.submitButton.getAttribute('class')).contains('active')
            .setNativeDialogHandler(() => true)
            .click(this.navs.submitButton);

        const history = await this.t.getNativeDialogHistory();
        await this.t
            .expect(history.length).eql(0)
            .expect(this.getLocation()).contains('/' + this.language + '/reservation-show.html');
    }

    toEmailPage() {
        return new EmailPage(this.t, this.language);
    }
}

export class EmailPage {
    constructor(t, language) {
        this.t = t;
        this.language = language;

        this.navs = {
            languageDropdown: Selector('#language_dropdown_toggle'),
            englishButton: Selector('#language_en'),
            germanButton: Selector('#language_de'),
        };
    }
}

export class Pages {
    static async progressToFormPage(t) {
        const p = new TitlePage(t);
        await p.submit();
        return p.toFormPage();
    }
}
