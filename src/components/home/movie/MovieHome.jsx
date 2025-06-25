import { Link } from 'react-router';


export default function MovieHome({
    id,
    name,
    imageUrl,
    description,
    onSeeTrailer
}) {

 return (
        <li key={id}>
            <h4>{name || ''}</h4>
            <img
                className="movie-1-pic"
                src={imageUrl}
                alt={name}
                width="224"
                height="269"
            />
            <p>{description || 'Няма описание'}</p>

            <div className="button-trailer-button">
                <Link onClick={() => {
                    console.log("Clicked See Trailer for id:", id);
                    onSeeTrailer(id);
                }} className="link2">
                    <span><span>See Trailer</span></span>
                </Link>
            </div>
        </li>
  );
}