export class TestData {
    static async fillFirstPerson(fp) {
        await fp.setName(1, 'John Tester1');
        await fp.setStreet(1, 'Teststraße 53');
        await fp.setCity(1, '12345 Berlin');
        await fp.setCountry(1, 'Germany');
        await fp.setEmail(1, 'uitester1@mailinator.com');
        await fp.setPhone(1, '+49 111 1111 111');
    }

    static async fillSecondPerson(fp) {
        await fp.setName(2, 'Paula Tester2');
        await fp.setStreet(2, 'Teststraße 54');
        await fp.setCity(2, '80123 München');
        await fp.setCountry(2, 'Germany');
        await fp.setEmail(2, 'uitester2@mailinator.com');
        await fp.setPhone(2, '0222 2222 222');
    }

    static async fillThirdPerson(fp) {
        await fp.setName(3, 'ÄÖÜßäöü Tester3');
        await fp.setStreet(3, 'Eichhörnchenweg 26746412634');
        await fp.setCity(3, 'Dover PGK-3MQ');
        await fp.setCountry(3, 'United Kingdom');
        await fp.setEmail(3, 'uitester3@mailinator.com');
        await fp.setPhone(3, '+40 126721 231683 21678 326 632 621 362763836216328126386');
    }

    static async verifyFirstPerson(fp) {
        await fp.verifyName(1, 'John Tester1');
        await fp.verifyEmail(1, 'uitester1@mailinator.com');
    }

    static async verifySecondPerson(fp) {
        await fp.verifyName(2, 'Paula Tester2');
        await fp.verifyEmail(2, 'uitester2@mailinator.com');
    }

    static async verifySingleRoomPrices(fp) {
        await fp.verifyPrice(1, "84,00");
        await fp.verifyPrice(2, "85,00");
        await fp.verifyPrice(3, "14,00");
    }

    static async verifyDoubleRoomPrices(fp) {
        await fp.verifyPrice(1, "99,00");
        await fp.verifyPrice(2, "100,00");
        await fp.verifyPrice(3, "15,00");
    }

    static async verifyTripleRoomPrices(fp) {
        await fp.verifyPrice(1, "104,00");
        await fp.verifyPrice(2, "105,00");
        await fp.verifyPrice(3, "19,00");
    }

    static async enterLongComment(fp) {
        var longComment = "This is a comment. It is not yet very long. But it will be...\n";
        var extension = "It is getting longer";
        for (var i = 0; i < 10; i++) {
            longComment += extension + "\n";
            extension += ' and longer #$%!=´` äöüÄÖÜß ';
        }
        longComment += "(" + longComment.length + " chars before this)";
        await fp.setComment(longComment);
    }

    static async setDates(fp) {
        var arrival = TestData.expectedArrival(fp);
        var departure = TestData.expectedDeparture(fp);
        await fp.setArrival(arrival);
        await fp.setDeparture(departure);
    }

    static expectedAlertMessage(fp) {
        if (fp.language === "de") {
            return "Du kannst die Email noch nicht generieren. Bitte fülle alle Pflichtfelder korrekt aus und setze den Haken bei &#39;Bestätigung&#39;, danach sollte es gehen. Dein Kommentar darf maximal 2000 Zeichen lang sein. Felder mit Validierungsfehlern sind rot markiert."
        } else {
            return "You cannot generate the email yet. Please make sure you fill in all required fields correctly and accept the disclaimer, then try again. Comments are limited to 2000 characters. Invalid fields are marked in red.";
        }
    }

    static expectedArrival(fp) {
        if (fp.language === "de") {
            return "15.08.2019";
        } else {
            return "08/15/2019";
        }
    }

    static expectedDeparture(fp) {
        if (fp.language === "de") {
            return "17.08.2019";
        } else {
            return "08/17/2019";
        }
    }

    static defaultArrival(fp) {
        if (fp.language === "de") {
            return "14.08.2019";
        } else {
            return "08/14/2019";
        }
    }

    static defaultDeparture(fp) {
        if (fp.language === "de") {
            return "18.08.2019";
        } else {
            return "08/18/2019";
        }
    }
}
