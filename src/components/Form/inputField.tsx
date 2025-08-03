import clsx from 'clsx';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './fieldWrapper';

const variants = {
  primary: '',
  secondary: 'bg-button',
};

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password' | 'number' | 'phone';
  className?: string;
  startIcon?: React.ReactElement;
  placeholder?: string;
  blueLabel?: boolean;
  registration: Partial<UseFormRegisterReturn>;
  variant?: keyof typeof variants;
  floating?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  onlyNumbers?: boolean; // Add a prop to enable only numeric input
  // setErrors?:any;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    label,
    variant = 'primary',
    className,
    registration,
    error,
    maxLength,
    minLength,
    placeholder,
    startIcon,
    blueLabel = false,
    floating = false,
    required = false,
    onlyNumbers = false, // Get the prop value
    isBold = false,
    // setErrors
  } = props;
  const [show, setShow] = useState(false);

 const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  let value = event.target.value;

  if (onlyNumbers) {
    value = value.replace(/[^0-9]/g, ''); // Remove everything except digits (no negative numbers)
  }

  if (/\s{3,}/.test(value)) {
    value = value.replace(/\s{3,}/g, '  '); 
  }

  if (/^\s+$/.test(value)) {
    value = '';
  }

  event.target.value = value;
};
// if (error) {
//   setErrors((prevErrors:any) => prevErrors.concat(error));
// }
  
  return (
    <FieldWrapper floating={floating} required={required} label={label} error={error} isBold={isBold} blueLabel={blueLabel}>
      {(() => {
        const Input = (
          <input
            type={show ? 'text' : type}
            className={clsx(
              'form-control',
              error?.message && 'is-invalid',
              variants[variant],
              className
            )}
            style={{ paddingRight: type === 'password' ? '35px' : '0.75rem' }}
            placeholder={placeholder ?? label}
            {...registration}
            autoComplete="new-password"
            maxLength={maxLength}
            minLength={minLength}
            inputMode={onlyNumbers ? 'numeric' : 'text'} // Use numeric input mode if onlyNumbers is true
            onInput={handleInput} // Attach the input handler
          />
        );

        let InputType = null;

        if (!floating) {
          InputType = Input;
        } else {
          InputType = (
            <div className="form-floating">
              {Input}
              <label>{label}</label>
            </div>
          );
        }

        if (startIcon) {
          return (
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                {startIcon}
              </span>
              {InputType}
            </div>
          );
        }
        return InputType;
      })()}

      {type === 'password' && (
        <span
          onClick={() => setShow(!show)}
          className={clsx('passwordIcon', floating && 'floating-icon', error && 'errored')}
        >
          {!show ? <i className="fa-regular fa-eye" /> : <i className="fa-regular fa-eye-slash" />}
        </span>
      )}
    </FieldWrapper>
  );
};


// CustomInputField.tsx

type CustomInputFieldProps = {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  type: string;
  placeholder: string;
  maxLength:number;
  minLength:number;
  required?:boolean;
};

export const CustomInputField: React.FC<CustomInputFieldProps> = ({ 
  label, 
  required, 
  value, 
  onChange, 
  minLength, 
  maxLength, 
  error, // Do NOT provide a default value here
  type, 
  placeholder 
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''}`} // Apply 'is-invalid' only if there's an error
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
      />
      {error && error !== 'Required' && <div className="invalid-feedback">{error}</div>} {/* Hide if error is 'Required' */}
    </div>
  );
};


