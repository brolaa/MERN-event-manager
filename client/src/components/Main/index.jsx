import { useState } from "react"
import axios from "axios"
import styles from "./styles.module.css"
import UserDetail from "../UserDetail";
import AddEvent from "../AddEvent";
import Events from "../Events";
import EditEvent from "../EditEvent";


const Main=()=> {
    const [title, setTitle] = useState("Welcome back!")
    const [details, setDetails] = useState("")
    const [events, setEvents] = useState([])
    const [addEventOpen, setAddEventOpen] = useState(false)
    const [showEvents, setShowEvents] = useState(false)
    const [updateEventOpen, setUpdateEventOpen] = useState(false)
    const [showUserDetail, setShowUserDetail] = useState(false)


    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }


    const handleGetUserDetail = async (e) => {
        e.preventDefault()

        //pobierz token z localStorage:
        const token = localStorage.getItem("token")

        //jeśli jest token w localStorage to:
        if (token) {
            try {
                //konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/users/accountDetail',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }
                //wysłanie żądania o dane:
                const { data: res } = await axios(config)
                //ustaw dane w komponencie za pomocą hooka useState na listę z danymi przesłanymi
                //z serwera – jeśli został poprawnie zweryfikowany token
                setDetails(res.data) // `res.data` - zawiera szczegóły użytkownika
                setUpdateEventOpen(false)
                setShowEvents(false)
                setAddEventOpen(false)
                setTitle(res.message)
                setShowUserDetail(true)
            } catch (error) {
                if (error.response && error.response.status >= 400 &&error.response.status <= 500)
                {
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        }
    }

    const handleDeleteAccount = async (e) => {
        e.preventDefault()

        if (window.confirm("Delete the account?")) {
            //pobierz token z localStorage:
            const token = localStorage.getItem("token")
            //jeśli jest token w localStorage to:
            if (token) {
                try {
                    //konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
                    const config = {
                        method: 'get',
                        url: 'http://localhost:8080/api/users/deleteAccount',
                        headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                    }
                    //wysłanie żądania o usunięcie:
                    await axios(config)

                    handleLogout()
                } catch (error) {
                    if (error.response && error.response.status >= 400 &&error.response.status <= 500)
                    {
                        localStorage.removeItem("token")
                        window.location.reload()
                    }
                }
            }
        }
    }

    const handleGetEvents = async (e) => {
        e.preventDefault()

        //pobierz token z localStorage:
        const token = localStorage.getItem("token")
        //jeśli jest token w localStorage to:
        if (token) {
            try {
                //konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/events',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }
                //wysłanie żądania o wydarzenia:
                const { data: res } = await axios(config)
                //ustaw dane w komponencie za pomocą hooka useState na listę z danymi przesłanymi
                //z serwera – jeśli został poprawnie zweryfikowany token
                setEvents(res.data) // `res.data` - zawiera sparsowane dane – listę
                setAddEventOpen(false)
                setUpdateEventOpen(false)
                setShowUserDetail(false)
                setShowEvents(true)
                setTitle(res.message)
            } catch (error) {
                if (error.response && error.response.status >= 400 &&error.response.status <= 500)
                {
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        }
    }

    const deleteEvent = async (e, id) => {
        e.preventDefault()

        //pobierz token z localStorage:
        const token = localStorage.getItem("token")
        //jeśli jest token w localStorage to:
        if (token) {
            try {
                //konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
                const config = {
                    method: 'delete',
                    url: 'http://localhost:8080/api/events/' + id,
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }
                await axios(config)
                await handleGetEvents(e)
            } catch (error) {
                if (error.response && error.response.status >= 400 &&error.response.status <= 500)
                {
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        }
    }

    const handleAddEventButton = () => {
        setTitle("Add Event")
        setShowEvents(false)
        setUpdateEventOpen(false)
        setShowUserDetail(false)
        setAddEventOpen(true)
    }

    const [editedEvent, setEditedEvent] = useState("")

    const handleUpdateButton = (e, event) => {
        setTitle("Update Event")
        setEditedEvent(event)
        //console.log(editedEvent)
        setShowUserDetail(false)
        setShowEvents(false)
        setUpdateEventOpen(true)
    }

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <button className={styles.white_btn} onClick={handleGetUserDetail}>
                    Account Detail
                </button>
                <button className={styles.white_btn} onClick={handleGetEvents}>
                    Events
                </button>
                <button className={styles.white_btn} onClick={handleAddEventButton}>
                    Add Event
                </button>
                <button className={styles.white_btn} onClick={handleDeleteAccount}>
                    Delete account
                </button>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            {title.length>0 ? <h2>{title}</h2> : <p></p>}
            {showEvents ? <Events events={events} onDelete={deleteEvent} onUpdate={handleUpdateButton}/> : <p></p>}
            {showUserDetail ? <UserDetail user={details} /> : <p></p>}
            {addEventOpen ? <AddEvent/> : <p></p>}
            {updateEventOpen ? <EditEvent event={editedEvent}/> : <p></p>}
        </div>
    )
}

export default Main