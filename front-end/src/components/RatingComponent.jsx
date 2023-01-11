import React from 'react'
import StarComponent from './StarComponent'

export default function RatingComponent({rating, numReviews, marginBottom, caption}) {
    return (
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: marginBottom}}>
            <div className='rating'>
                <StarComponent rating={rating} full={1} half={0.5}/>
                <StarComponent rating={rating} full={2} half={1.5}/>
                <StarComponent rating={rating} full={3} half={2.5}/>
                <StarComponent rating={rating} full={4} half={3.5}/>
                <StarComponent rating={rating} full={5} half={4.5}/>
            </div>
            {caption ? (
                <span>{caption}</span>
            ) : (
                <span>{numReviews} Reviews</span>
            )}
        </div>
    )
}
