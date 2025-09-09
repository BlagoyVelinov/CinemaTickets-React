export default function Ticket({ ticket }) {
    
    return(
        <>
            <h1>Ticket ID: {ticket.id}</h1>
            <p>Title: {ticket.movieName}</p>
        </>
    );
}