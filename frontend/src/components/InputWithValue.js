const InputWithValue = (props) => {
  const { id, label, onChange, help, type, initialValue, value } = props;

  let inputClass = 'form-control';
  if (help) {
    inputClass += ' is-invalid';
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        className={inputClass}
        onChange={onChange}
        type={type || 'text'}
        defaultValue={initialValue}
        value={value}
      />
      {help && <span className="invalid-feedback">{help}</span>}
    </div>
  );
};

export default InputWithValue;
