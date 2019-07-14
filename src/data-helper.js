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
}
