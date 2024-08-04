import { useState } from "react";


export function Stars( { maxRating = 5, rating, onRating } ) {

    const [permanentRating, setPermanentRating] = useState(0);

    return (
    <div className="stars">
        <div>
            {
                Array.from({ length: Number(maxRating) }, (_, i) => (
                    <Star 
                        key={i} 
                        value={i + 1} 
                        filledStar={permanentRating? permanentRating >= i + 1: rating >= i + 1}
                        onPermanentRating={setPermanentRating}
                        onRating={onRating}
                        />
                ))
            }
        </div>
        <p className="rating">{permanentRating || rating}</p>
    </div>
    )
}

function Star( { filledStar = false, value, onPermanentRating, onRating} ) {
    
    return <img 
        value={value} 
        alt="star" 
        src={filledStar ? "resources/fullStar.png": "resources/emptyStar.png"}
        onMouseEnter={() => onPermanentRating(value)}
        onMouseLeave={() => onPermanentRating(0)}
        onClick={() => onRating(value)}
    />
}
