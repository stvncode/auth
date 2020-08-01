import { stylesheet } from 'typestyle'
import sunrise from './pictures/sunrise.jpg'

export const css = stylesheet({
    header: {
        width: 'auto',
        height: '50rem',
        backgroundImage: `url(${sunrise})`,
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between'
    },
    link: {
        textDecoration: 'none', 
        color: 'white'
    }
})
