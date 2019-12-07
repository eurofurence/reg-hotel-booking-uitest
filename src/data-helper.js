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
        await fp.verifyPrice(1, "90,00");
        await fp.verifyPrice(2, "105,00");
        await fp.verifyPrice(3, "153,00");
        await fp.verifyPrice(4, "173,00");
    }

    static async verifyDoubleRoomPrices(fp) {
        await fp.verifyPrice(1, "120,00");
        await fp.verifyPrice(2, "140,00");
        await fp.verifyPrice(3, "178,00");
        await fp.verifyPrice(4, "208,00");
    }

    static async verifyTripleRoomPrices(fp) {
        await fp.verifyPrice(1, "195,00");
        await fp.verifyPrice(2, "210,00");
        await fp.verifyPrice(3, "240,00");
        await fp.verifyPrice(4, "270,00");
    }

    static async enterLongComment(fp, counter) {
        if (!counter) {
            counter = 10; // just barely does not exceed 2000 characters
        }
        var longComment = "This is a comment. It is not yet very long. But it will be...\n";
        var extension = "It is getting longer";
        for (var i = 0; i < counter; i++) {
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
            return "16.08.2020";
        } else {
            return "08/16/2020";
        }
    }

    static expectedDeparture(fp) {
        if (fp.language === "de") {
            return "24.08.2020";
        } else {
            return "08/24/2020";
        }
    }

    static defaultArrival(fp) {
        if (fp.language === "de") {
            return "19.08.2020";
        } else {
            return "08/19/2020";
        }
    }

    static defaultDeparture(fp) {
        if (fp.language === "de") {
            return "23.08.2020";
        } else {
            return "08/23/2020";
        }
    }

    static async verifyMailBefore(ep) {
        var expectedSubjectSnippet = 'Eurofurence 2020 - ■■■■■■■';
        var expectedEmailSnippet = "Codeword:    ■■■■■■■";
        if (ep.language === "de") {
            expectedEmailSnippet = "Codewort:    ■■■■■■■";
        }

        await ep.verifySubjectContains(expectedSubjectSnippet);
        await ep.verifyEmailContains(expectedEmailSnippet);
    }

    static async verifyMailAfter(ep) {
        var expectedSubjectSnippet = 'Eurofurence 2020 - demosecret';
        var expectedEmailSnippet = "Codeword:    demosecret";
        if (ep.language === "de") {
            expectedEmailSnippet = "Codewort:    demosecret";
        }

        await ep.verifySubjectContains(expectedSubjectSnippet);
        await ep.verifyEmailContains(expectedEmailSnippet);
    }

    static async verifyMailGermanSingleFirst(ep) {
        var expectedMailtext = "Sehr geehrte Damen und Herren,\n" +
            "\n" +
            "Ich möchte die folgende Reservierung vornehmen:\n" +
            "\n" +
            "Keyword:     Eurofurence 2020\n" +
            "Codewort:    ■■■■■■■\n" +
            "\n" +
            "Zimmertyp:   Standard Zimmer\n" +
            "Personen:    1 Person(en)\n" +
            "\n" +
            "Anreise:     19.08.2020\n" +
            "Abreise:     23.08.2020\n" +
            "\n" +
            "1. Person und Hauptkontakt:\n" +
            "             John Tester1\n" +
            "             Teststraße 53\n" +
            "             12345 Berlin\n" +
            "             Germany\n" +
            "             uitester1@mailinator.com\n" +
            "             +49 111 1111 111\n" +
            "\n" +
            "Vielen Dank!\n" +
            "\n" +
            "Mit freundlichen Grüßen,\n" +
            "John Tester1\n";
        await ep.verifyEmailIs(expectedMailtext);
    }

    static async verifyMailGermanDoubleSecond(ep) {
        var expectedMailtext = "Sehr geehrte Damen und Herren,\n" +
            "\n" +
            "Ich möchte die folgende Reservierung vornehmen:\n" +
            "\n" +
            "Keyword:     Eurofurence 2020\n" +
            "Codewort:    demosecret\n" +
            "\n" +
            "Zimmertyp:   Deluxe Zimmer\n" +
            "Personen:    2 Person(en)\n" +
            "\n" +
            "Anreise:     19.08.2020\n" +
            "Abreise:     23.08.2020\n" +
            "\n" +
            "1. Person und Hauptkontakt:\n" +
            "             John Tester1\n" +
            "             Teststraße 53\n" +
            "             12345 Berlin\n" +
            "             Germany\n" +
            "             uitester1@mailinator.com\n" +
            "             +49 111 1111 111\n" +
            "\n" +
            "2. Person:\n" +
            "             (Angaben nicht verfügbar)\n" +
            "\n" +
            "Vielen Dank!\n" +
            "\n" +
            "Mit freundlichen Grüßen,\n" +
            "John Tester1\n";
        await ep.verifyEmailIs(expectedMailtext);
    }

    static async verifyMailGermanTripleThird(ep) {
        var expectedMailtext = "Sehr geehrte Damen und Herren,\n" +
            "\n" +
            "Ich möchte die folgende Reservierung vornehmen:\n" +
            "\n" +
            "Keyword:     Eurofurence 2020\n" +
            "Codewort:    ■■■■■■■\n" +
            "\n" +
            "Zimmertyp:   Junior Suite\n" +
            "Personen:    3 Person(en)\n" +
            "\n" +
            "Anreise:     19.08.2020\n" +
            "Abreise:     23.08.2020\n" +
            "\n" +
            "1. Person und Hauptkontakt:\n" +
            "             John Tester1\n" +
            "             Teststraße 53\n" +
            "             12345 Berlin\n" +
            "             Germany\n" +
            "             uitester1@mailinator.com\n" +
            "             +49 111 1111 111\n" +
            "\n" +
            "2. Person:\n" +
            "             Paula Tester2\n" +
            "             Teststraße 54\n" +
            "             80123 München\n" +
            "             Germany\n" +
            "             uitester2@mailinator.com\n" +
            "             0222 2222 222\n" +
            "\n" +
            "3. Person:\n" +
            "             ÄÖÜßäöü Tester3\n" +
            "             Eichhörnchenweg 26746412634\n" +
            "             Dover PGK-3MQ\n" +
            "             United Kingdom\n" +
            "             uitester3@mailinator.com\n" +
            "             +40 126721 231683 21678 326 632 621 362763836216328126386\n" +
            "\n" +
            "\n" +
            "Vielen Dank!\n" +
            "\n" +
            "Mit freundlichen Grüßen,\n" +
            "John Tester1\n";
        await ep.verifyEmailIs(expectedMailtext);
    }

    static async verifyMailEnglishSingleFirst(ep) {
        var expectedMailtext = "Dear Sir or Madam!\n" +
            "\n" +
            "I would like to make the following reservation:\n" +
            "\n" +
            "Keyword:     Eurofurence 2020\n" +
            "Codeword:    ■■■■■■■\n" +
            "\n" +
            "Room Type:   Standard Room\n" +
            "Occupancy:   1 person(s)\n" +
            "\n" +
            "Arrival:     08/19/2020\n" +
            "Departure:   08/23/2020\n" +
            "\n" +
            "1st Person and main contact:\n" +
            "             John Tester1\n" +
            "             Teststraße 53\n" +
            "             12345 Berlin\n" +
            "             Germany\n" +
            "             uitester1@mailinator.com\n" +
            "             +49 111 1111 111\n" +
            "\n" +
            "Thank You!\n" +
            "\n" +
            "Best regards,\n" +
            "John Tester1\n";
        await ep.verifyEmailIs(expectedMailtext);
    }

    static async verifyMailEnglishDoubleSecond(ep) {
        var expectedMailtext = "Dear Sir or Madam!\n" +
            "\n" +
            "I would like to make the following reservation:\n" +
            "\n" +
            "Keyword:     Eurofurence 2020\n" +
            "Codeword:    demosecret\n" +
            "\n" +
            "Room Type:   Deluxe Room\n" +
            "Occupancy:   2 person(s)\n" +
            "\n" +
            "Arrival:     08/19/2020\n" +
            "Departure:   08/23/2020\n" +
            "\n" +
            "1st Person and main contact:\n" +
            "             John Tester1\n" +
            "             Teststraße 53\n" +
            "             12345 Berlin\n" +
            "             Germany\n" +
            "             uitester1@mailinator.com\n" +
            "             +49 111 1111 111\n" +
            "\n" +
            "2nd Person:\n" +
            "             (info not available)\n" +
            "\n" +
            "Thank You!\n" +
            "\n" +
            "Best regards,\n" +
            "John Tester1\n";
        await ep.verifyEmailIs(expectedMailtext);
    }

    static async verifyMailEnglishTripleThird(ep) {
        var expectedMailtext = "Dear Sir or Madam!\n" +
            "\n" +
            "I would like to make the following reservation:\n" +
            "\n" +
            "Keyword:     Eurofurence 2020\n" +
            "Codeword:    ■■■■■■■\n" +
            "\n" +
            "Room Type:   Junior Suite\n" +
            "Occupancy:   3 person(s)\n" +
            "\n" +
            "Arrival:     08/19/2020\n" +
            "Departure:   08/23/2020\n" +
            "\n" +
            "1st Person and main contact:\n" +
            "             John Tester1\n" +
            "             Teststraße 53\n" +
            "             12345 Berlin\n" +
            "             Germany\n" +
            "             uitester1@mailinator.com\n" +
            "             +49 111 1111 111\n" +
            "\n" +
            "2nd Person:\n" +
            "             Paula Tester2\n" +
            "             Teststraße 54\n" +
            "             80123 München\n" +
            "             Germany\n" +
            "             uitester2@mailinator.com\n" +
            "             0222 2222 222\n" +
            "\n" +
            "3rd Person:\n" +
            "             ÄÖÜßäöü Tester3\n" +
            "             Eichhörnchenweg 26746412634\n" +
            "             Dover PGK-3MQ\n" +
            "             United Kingdom\n" +
            "             uitester3@mailinator.com\n" +
            "             +40 126721 231683 21678 326 632 621 362763836216328126386\n" +
            "\n" +
            "Thank You!\n" +
            "\n" +
            "Best regards,\n" +
            "John Tester1\n";
        await ep.verifyEmailIs(expectedMailtext);
    }
}
