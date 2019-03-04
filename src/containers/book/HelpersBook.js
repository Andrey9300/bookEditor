export const MIN_YEAR_PUBLISH = '1800';

export const MIN_DATE_EDITION = '1800-01-01';

export const isValidIsbn = (isbn) => {
    let sum, weight, digit, check;

    isbn = isbn.replace(/[^0-9X]/gi, '');

    if (isbn.length !== 10 && isbn.length !== 13) {
        return false;
    }

    if (isbn.length === 13) {
        sum = 0;

        for (let i = 0; i < 12; i++) {
            digit = parseInt(isbn[i]);
            if (i % 2 === 1) {
                sum += 3*digit;
            } else {
                sum += digit;
            }
        }

        check = (10 - (sum % 10)) % 10;

        return Number(check) === Number(isbn[isbn.length-1]);
    } else if (isbn.length === 10) {
        weight = 10;
        sum = 0;

        for (let i = 0; i < 9; i++) {
            digit = parseInt(isbn[i]);
            sum += weight*digit;
            weight--;
        }

        check = 11 - (sum % 11);

        if (Number(check) === 10) {
            check = 'X';
        }

        return Number(check) === Number(isbn[isbn.length-1].toUpperCase());
    }
};
