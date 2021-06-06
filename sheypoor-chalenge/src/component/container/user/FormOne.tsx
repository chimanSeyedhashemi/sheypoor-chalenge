import React, { ChangeEvent, useEffect, useState } from "react";
import { translator } from "../../../constant/translator";
import { AppButton } from "../../share/form/Button";
import { AppInput } from "../../share/form/Input";
import { ENEWS_LETTER } from "./enum";

interface IInput {
  name: { value: string; isValid: boolean };
  age: { value: number; isValid: boolean };
}

const initialInput: IInput = {
  name: { value: "", isValid: false },
  age: { value: 0, isValid: false },
};

export interface IFormOne {
  name: string;
  age: number;
}

interface IProps {
  next(value: IFormOne): void;
  initialValue: IFormOne;
}

export const FormOne = (props: IProps) => {
  const [inputs, setInputs] = useState<IInput>(initialInput);

  /**
   * this useEffect call when props.initialValue changed && in changing forms
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   *
   * @beta
   */

  useEffect(() => {
    let newData: IInput = {
      name: {
        value: props.initialValue.name,
        isValid: props.initialValue.name ? true : false,
      },
      age: {
        value: props.initialValue.age,
        isValid: props.initialValue.age ? true : false,
      },
    };
    setInputs(newData);
  }, [props.initialValue]);

  

  /**
   * handleChange function store input changesin inputs state
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   * @param e - The first input is onchange event object
   *
   * @beta
   */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let isValid: boolean = e.target.value ? true : false;
    setInputs({
      ...inputs,
      [e.target.name]: { value: e.target.value, isValid },
    });
  };

  /**
   * validation function return is valid form or not
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   * @return boolean for the state of validation
   *
   * @beta
   */
  const validation = (): boolean => {
    if (inputs.name.isValid && inputs.age.isValid) {
      return true;
    }
    return false;
  };

  /**
   * next function prepare data to user state in parent component and call props.next fun
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   *
   * @beta
   */

  const next = () => {
    const data: IFormOne = {
      name: inputs.name.value,
      age: inputs.age.value,
    };

    props.next(data);
  };

  return (
    <>
      <div className="m-1">
        <AppInput
          lable={`${translator.name}:`}
          required
          name="name"
          onChange={handleChange}
          value={inputs.name.value}
        />
      </div>
      <div className="m-1">
        <AppInput
          lable={`${translator.age}:`}
          value={inputs.age.value}
          name="age"
          type="number"
          required
          onChange={handleChange}
        />
      </div>
      <div className="m-1 d-flex justify-content-end">
        <AppButton
          title={translator.next}
          btnClassName="btn-primary"
          onClick={next}
          disabled={!validation()}
        />
      </div>
    </>
  );
};
