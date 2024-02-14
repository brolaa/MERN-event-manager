import { useState, useEffect } from "react"
import axios from "axios"
import styles from "./styles.module.css"
import { WiTime2, WiTime4 } from "react-icons/wi"
import {icons} from "react-icons";

const EditEvent = (event) => {
    const [data, setData] = useState({
        name: "",
        description: "",
        place: ""
    })

    const [business, setBusiness] = useState(true)

    const [date, setDate] = useState({
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
    })

    const [info, setInfo] = useState("")

    useEffect(() => {
        const eventUpdate = event.event
        setData({
            name: eventUpdate.name,
            description: eventUpdate.description,
            place: eventUpdate.place
        })
        setDate({
            startDate: eventUpdate.startDate,
            endDate: eventUpdate.endDate
        })

        setBusiness(eventUpdate.business)
    }, [])



    function handleDateChange(ev) {
        if (!ev.target['validity'].valid) return
        const dt= ev.target['value'] + ':00Z'

        setDate({ ...date, [ev.target['name']]: dt })
    }

    const [error, setError] = useState({})

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const str2bool = (value) => {
        if (value && typeof value === "string") {
            if (value.toLowerCase() === "true") return true;
            if (value.toLowerCase() === "false") return false;
        }
        return value;
    }

    const onRadioChange = (e) => {
        setBusiness(str2bool(e.target.value))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        //pobierz token z localStorage:
        const token = localStorage.getItem("token")

        if (token) {
            try {
                //const body = data.concat([startDate, endDate, business])
                //console.log(body)

                const config = {
                    method: 'put',
                    url: 'http://localhost:8080/api/events/' + event.event._id,
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token },
                    data: {
                        name: data.name,
                        description: data.description,
                        place: data.place,
                        startDate: date.startDate,
                        endDate: date.endDate,
                        business: business
                    }
                }

                setError({})
                const {data: res} = await axios(config)
                setInfo(res.message)
                console.log(res.message)
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setInfo("")
                    let errorList = (error.response.data.errors)
                    errorList = errorList
                        .map(e => ({[e.path]: e.msg}))
                        .reduce((current, next) => {
                            return { ...current, ...next};
                        }, {})
                    setError(errorList)
                }
            }
        }
    }

    return (
        <div className={styles.event_form}>
            <form onSubmit={handleSubmit}>
                <div className={styles.event_field}>
                    <input className={styles.event_textfield}
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={handleChange}
                        value={data.name}
                    />
                </div>
                {error.name && <div className={styles.error_msg}>{error.name}</div>}

                <div className={styles.event_field}>
                    <input className={styles.event_textfield}
                        type="text"
                        placeholder="Description"
                        name="description"
                        onChange={handleChange}
                        value={data.description}
                    />
                </div>
                {error.description &&<div className={styles.error_msg}>{error.description}</div>}

                <div className={styles.event_field}>
                    <input className={styles.event_textfield}
                        type="text"
                        placeholder="Place"
                        name="place"
                        onChange={handleChange}
                        value={data.place}
                    />
                </div>
                {error.place && <div className={styles.error_msg}>{error.place}</div>}

                <div className={styles.event_field}>
                    <WiTime2 className={styles.icon}/>

                    <input type="datetime-local"
                           className={styles.datetime_input}
                           name="startDate"
                           value={(date.startDate || '').toString().substring(0, 16)}
                           onChange={handleDateChange} />
                </div>
                {error.startDate && <div className={styles.error_msg}>{error.startDate}</div>}

                <div className={styles.event_field}>
                    <WiTime4 className={styles.icon}/>
                    <input type="datetime-local"
                           className={styles.datetime_input}
                           name="endDate"
                           value={(date.endDate || '').toString().substring(0, 16)}
                           onChange={handleDateChange} />
                </div>
                {error.endDate && <div className={styles.error_msg}>{error.endDate}</div>}

                <div className="form-check">
                    <label>
                        <input
                            type="radio"
                            name="isBusiness"
                            value="true"
                            onChange={onRadioChange}
                            className="form-check-input"
                            checked={business === true}
                        />
                        Business
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="isBusiness"
                            value="false"
                            onChange={onRadioChange}
                            className="form-check-input"
                            checked={business === false}
                        />
                        Home
                    </label>
                </div>
                {error.business && <div className={styles.error_msg}>{error.business}</div>}
                {info && <div className={styles.success}>{info}</div>}

                <div className={styles.event_field}>
                    <button className={styles.green_btn} type="submit">
                        Update Event
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditEvent

