import {Selector, ClientFunction} from 'testcafe';

export class TitlePage {
    constructor(t) {
        this.t = t;
        this.language = 'en';

        this.getLocation = ClientFunction(() => document.location.href);

        // Our Buttons and their labels do not have an id yet - TODO give them one
        this.navs = {
            submitButton: Selector('a[href="reservation-form.html"]'),
            languageDropdown: Selector('a[class="dropdown-toggle"]'),
            englishButton: Selector('a[href="../en/index.html"]'),
            germanButton: Selector('a[href="../de/index.html"]'),
        };
        // Most of our text elements do not have ids yet - TODO give them one
        this.labels = {
            textHeadline: Selector('#unhide_with_js div h4'),
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
        // TODO once the full text has an id, we can compare the whole thing
        var expectedHeadline = this.language === 'en' ? 'Booking a Hotelroom for Eurofurence' : 'Hotelbuchungsprozedur für Eurofurence';

        await this.t
            .expect(this.getLocation()).contains('/' + this.language + '/')
            // automatically selects the first match I think, get second match using .nth(1)
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
            englishButton: Selector('a[href="../en/reservation-form.html"]'),
            germanButton: Selector('a[href="../de/reservation-form.html"]'),
            submitButton: Selector('#submitbutton'),
        };
        this.labels = {
            roomsize: [Selector('#size_single_label'), Selector('#size_double_label'), Selector('#size_triple_label')],
            // it makes no sense to have the labels for column 2 now that column 1 is editable
            // TODO change this in the app and here
            name: Selector('label[for="name2"]'),
            street: Selector('label[for="street2"]'),
            city: Selector('label[for="city2"]'),
            country: Selector('label[for="country2"]'),
            email: Selector('label[for="email2"]'),
            phone: Selector('label[for="phone2"]'),
            dates: Selector('label[for="arrival"]'),
            // TODO this label really needs an id
            // roomtype: Selector('label[for="arrival"]'),
            roomtypes: [Selector('#roomtype1button'), Selector('#roomtype2button'), Selector('#roomtype3button')],
            price: [Selector('#roomtype1price'), Selector('#roomtype2price'), Selector('#roomtype3price')],
        };
        this.fields = {
            name: [Selector('#name1'), Selector('#name2'), Selector('#name3')],
            street: [Selector('#street1'), Selector('#street2'), Selector('#street3')],
            city: [Selector('#city1'), Selector('#city2'), Selector('#city3')],
            country: [Selector('#country1'), Selector('#country2'), Selector('#country3')],
            email: [Selector('#email1'), Selector('#email2'), Selector('#email3')],
            phone: [Selector('#phone1'), Selector('#phone2'), Selector('#phone3')],
            arrival: Selector('#arrival'),
            departure: Selector('#departure'),
            roomtype: [Selector('#roomtype1button'), Selector('#roomtype2button'), Selector('#roomtype3button')],
            disclaimer: Selector('#understood'),
        };
    }

    async setRoomsize(sizeNo) {
        await this.t
            .click(this.labels.roomsize[sizeNo - 1]);
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
            .expect(this.fields.arrival.value).eql('08/14/2019')
            .expect(this.fields.departure.value).eql('08/18/2019')
            // TODO how to get the value of a radio button????
            // .expect(this.fields.roomtype[0].selected).eql(true)
            .expect(this.fields.disclaimer.checked).notOk()
    }

    async setName(personNo, value) {
        await this.t
            .typeText(this.fields.name[personNo - 1], value);
    }

    async setStreet(personNo, value) {
        await this.t
            .typeText(this.fields.street[personNo - 1], value);
    }

    async setCity(personNo, value) {
        await this.t
            .typeText(this.fields.city[personNo - 1], value);
    }

    async setCountry(personNo, value) {
        await this.t
            .typeText(this.fields.country[personNo - 1], value);
    }

    async setEmail(personNo, value) {
        await this.t
            .typeText(this.fields.email[personNo - 1], value);
    }

    async setPhone(personNo, value) {
        await this.t
            .typeText(this.fields.phone[personNo - 1], value);
    }

    async verifyPrice(roomtypeNo, valueString) {
        await this.t
            .expect(this.labels.price[roomtypeNo - 1].innerText).eql(valueString + " €*");
    }
}

export class EmailPage {
    constructor(t, language) {
        this.t = t;
        this.language = language;

        this.navs = {
            englishButton: Selector('a[href="../en/reservation-show.html"]'),
            germanButton: Selector('a[href="../de/reservation-show.html"]'),
        };
    }
}

export class Pages {
    static async progressToFormPage(t) {
        var p = new TitlePage(t);
        await p.submit();
        var fp = p.toFormPage();
        return fp;
    }
}