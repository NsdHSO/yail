import classNames from "classnames";
import { FC } from "react";
import ReactSelect, { MultiValue, SingleValue } from "react-select";

import InputError from "Components/Inputs/Common/InputError";
import InputHeader from "Components/Inputs/Common/InputHeader";

import { styles } from "./styles";
import { ISelectProps } from "./types";

type Option = {
  value: string;
  label: string;
};

const Select: FC<ISelectProps> = props => {
  const { hint, label, max, defaultValue, isMulti = false, options } = props;

  const handleOnChange = (
    option: MultiValue<Option | undefined> | SingleValue<Option | undefined>
  ): void => {
    if (Array.isArray(option) && isMulti) {
      return props.onChange({ [props.name]: option.map(({ value }) => value) });
    }

    return props.onChange({ [props.name]: (option as Option).value });
  };

  const getValue = () => {
    if (Array.isArray(props.value)) {
      return props.value.map(value =>
        props.options.find(option => option.value === value)
      );
    }

    return props.options.find(option => option.value === props.value);
  };

  return (
    <div className={classNames(props.inputWrapperClassName)}>
      {max || label || hint ? (
        <InputHeader
          name={props.name}
          type={props.type}
          hint={props.hint}
          label={props.label}
          max={props.max}
          required={props.required}
        />
      ) : null}
      <ReactSelect
        options={options}
        isSearchable={props.isSearchable}
        closeMenuOnSelect={isMulti ? false : true}
        isMulti={isMulti}
        defaultValue={defaultValue}
        value={getValue()}
        styles={styles()}
        className='pn-select-container text-sm'
        classNamePrefix='pn-select'
        onChange={handleOnChange}
      />
      {props.error && <InputError error={props.error} />}
    </div>
  );
};

export default Select;
