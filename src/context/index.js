import { createContext, useContext, useMemo, useState } from 'react'
import { getGuests, insertGuest, putGuest, dropGuest } from '../service';

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({children}) => {
    const [guests, setGuests] = useState([]);

    const fetchGuests = () => {
        getGuests().then(setGuests)
    }

    const addGuest = (body) => {
        insertGuest(body).then(setGuests)
    }

    const editGuest = (body) => {
        putGuest(body).then(setGuests)
    }

    const deleteGuest = (body) => {
        dropGuest(body).then(setGuests)
    }

    const value = useMemo(() => {
        return {
            guests,
            fetchGuests,
            addGuest, 
            editGuest,
            deleteGuest
        }
    }, [guests, fetchGuests, addGuest, editGuest, deleteGuest])

    return <Provider value={value}>{children}</Provider> 
}

export const useAppContext = () => {
    return useContext(AppContext);
}

export default AppProvider;