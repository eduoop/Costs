import styles from './Select.module.css'

function Select ({ text, name, options, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select onChange={handleOnChange} name={name} id={name} value={value || ''  }>
                <option>Selecione uma categoria</option>
                { options.map((category) => (
                    <option value={category.id} key={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Select