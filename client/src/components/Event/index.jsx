import styles from "./styles.module.css"
import { FaMapMarkerAlt } from "react-icons/fa"
import { WiTime2, WiTime4 } from "react-icons/wi"
import { MdWork, MdEdit, MdDelete, MdDescription } from "react-icons/md"
import { HiHome } from "react-icons/hi"

const Event = ({ event, onDelete, onUpdate}) => {

    const options = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    }

    options.timeZone = 'UTC'

    return (
        <div className={styles.event}>
            <div className={styles.event_buttons}>
                <MdEdit onClick={(e) => onUpdate(e, event)}/>
                <MdDelete onClick={(e) => onDelete(e, event._id)}/>
            </div>
            <div className={styles.event_header}>
                {event.business ? <MdWork className={styles.icon}/>: <HiHome className={styles.icon}/>}
                {event.name}
            </div>
            <div className={styles.event_value}>
                <MdDescription className={styles.icon}/>
                Description: {event.description}
            </div>
            <div className={styles.event_value}>
                <FaMapMarkerAlt className={styles.icon}/>
                Place: {event.place}
            </div>
            <div className={styles.event_value}>
                <WiTime2 className={styles.icon}/>
                {new Date(event.startDate).toLocaleString('pl-PL', options)}
            </div>
            <div className={styles.event_value}>
                <WiTime4 className={styles.icon}/>
                {new Date(event.endDate).toLocaleString('pl-PL', options)}
            </div>
        </div>
    );
}
export default Event