import styles from "./styles.module.css"

const UserDetail = (props) => {
    const user = props.user;
    return (
        <div className={styles.details}>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>id: {user._id}</p>
            <p>email: {user.email}</p>
        </div>
    );
}
export default UserDetail