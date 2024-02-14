import styles from "./styles.module.css"
import Event from "../Event"

function Events({events, onDelete, onUpdate}) {
    return (
        <div>
            {events.map((event) => (
                <Event key={event._id} value={event._id} event={event} onDelete={onDelete} onUpdate={onUpdate}/>
            ))}
        </div>
    );
}
export default Events