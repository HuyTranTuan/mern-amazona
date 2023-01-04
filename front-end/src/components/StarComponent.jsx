import React from 'react'

export default function StarComponent({rating, full, half}) {
    return (
        <span>
            <i className={ rating>=full
                ? 'fa-solid fa-star'
                : (rating >=half
                ? 'fa-solid fa-star-half-alt'
                : 'far fa-star')
            }/>
        </span>
    )
}
