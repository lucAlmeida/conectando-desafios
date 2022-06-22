const TextArea = (props) => {
  const { id, label, onChange, help, type, initialValue, numberOfRows } = props;

  let inputClass = 'form-control';
  if (help) {
    inputClass += ' is-invalid';
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        id={id}
        className={inputClass}
        onChange={onChange}
        type={type || 'text'}
        defaultValue={initialValue}
        rows={numberOfRows}
      />
      {help && <span className="invalid-feedback">{help}</span>}
    </div>
  );
};

export default TextArea;
