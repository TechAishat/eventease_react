import { useEffect, useMemo, useState } from 'react';

const STATUS_OPTIONS = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'closed', label: 'Closed' }
];

const defaultValues = {
  title: '',
  status: 'open',
  description: '',
  priority: 'normal'
};

const TicketForm = ({ initialValues = defaultValues, onSubmit, submitLabel, onCancel }) => {
  const [values, setValues] = useState({ ...defaultValues, ...initialValues });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues((current) => ({ ...current, ...initialValues }));
    setErrors({});
  }, [initialValues]);

  const isEditing = useMemo(() => Boolean(initialValues?.id), [initialValues]);

  const validate = () => {
    const nextErrors = {};

    if (!values.title.trim()) {
      nextErrors.title = 'Title is required.';
    } else if (values.title.trim().length > 120) {
      nextErrors.title = 'Title must be 120 characters or less.';
    }

    if (!STATUS_OPTIONS.some((option) => option.value === values.status)) {
      nextErrors.status = 'Status must be open, in progress, or closed.';
    }

    if (values.description && values.description.length > 500) {
      nextErrors.description = 'Description must not exceed 500 characters.';
    }

    if (values.priority && values.priority.length > 40) {
      nextErrors.priority = 'Priority label must not exceed 40 characters.';
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit?.(values, { reset: () => setValues({ ...defaultValues }) });
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor={`ticket-title-${isEditing ? initialValues.id : 'new'}`}>Title *</label>
        <input
          id={`ticket-title-${isEditing ? initialValues.id : 'new'}`}
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          className={errors.title ? 'input-error' : ''}
          required
          maxLength={120}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label htmlFor={`ticket-status-${isEditing ? initialValues.id : 'new'}`}>Status *</label>
        <select
          id={`ticket-status-${isEditing ? initialValues.id : 'new'}`}
          name="status"
          value={values.status}
          onChange={handleChange}
          className={errors.status ? 'input-error' : ''}
          required
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.status && <span className="error-text">{errors.status}</span>}
      </div>

      <div className="form-field">
        <label htmlFor={`ticket-priority-${isEditing ? initialValues.id : 'new'}`}>
          Priority (optional)
        </label>
        <input
          id={`ticket-priority-${isEditing ? initialValues.id : 'new'}`}
          name="priority"
          type="text"
          value={values.priority}
          onChange={handleChange}
          className={errors.priority ? 'input-error' : ''}
          maxLength={40}
          placeholder="e.g. High, Medium"
        />
        {errors.priority && <span className="error-text">{errors.priority}</span>}
      </div>

      <div className="form-field">
        <label htmlFor={`ticket-description-${isEditing ? initialValues.id : 'new'}`}>
          Description (optional)
        </label>
        <textarea
          id={`ticket-description-${isEditing ? initialValues.id : 'new'}`}
          name="description"
          value={values.description}
          onChange={handleChange}
          className={errors.description ? 'input-error' : ''}
          rows={isEditing ? 5 : 4}
          maxLength={500}
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>

      <div className="hero-actions" style={{ justifyContent: 'flex-start' }}>
        <button type="submit" className="btn">
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TicketForm;
