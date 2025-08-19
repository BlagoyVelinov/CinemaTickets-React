import dateFormat from 'dateformat';

export function formatBirthdate(birthdate) {
    if (!birthdate) return;
    return dateFormat(birthdate, "dd mmm yyyy");
}