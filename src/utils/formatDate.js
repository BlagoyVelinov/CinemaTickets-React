import dateFormat from 'dateformat';

export function formatBirthdate(birthdate) {
    if (!birthdate) return;
    return dateFormat(birthdate, "dd mmm yyyy");
}

export function formatProjectionDate(date) {
    if (!date) return;
    return dateFormat(date, "dd mmmm");
}