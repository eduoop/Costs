import styles from './ButtonSubmit.module.css'

function ButtonSubmit({ text }) {
    return (
        <div>
            <button className={styles.btnSubmit}>{text}</button>
        </div>
    )
}

export default ButtonSubmit