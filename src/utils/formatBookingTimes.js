
export function formatBookingTime(bookingTime) {
    if (!bookingTime) return;
    
    return bookingTime.replace(/^_/,"").replace("_", ":");
}