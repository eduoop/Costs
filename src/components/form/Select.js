import styles from './Select.module.css'

function Select ({ text, name, options, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select>
                <option>Selecione uma categoria</option>
                { options.map((category) => (
                    <option key={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Select