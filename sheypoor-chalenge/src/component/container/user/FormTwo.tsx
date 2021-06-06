import React, { ChangeEvent, useEffect, useState } from "react";
import { AppRegex } from "../../../constant/regex";
import { AppButton } from "../../share/form/Button";
import { AppInput } from "../../share/form/Input";
import { ENEWS_LETTER } from "./enum";
import Select, { ActionMeta, ValueType } from "react-select";
import { translator } from "../../../constant/translator";

interface ISelect {
  value: ENEWS_LETTER;
  label: ENEWS_LETTER;
}

interface IInput {
  email: { value: string; isValid: boolean };
  newsletter: {
    value: ISelect;
    isValid: boolean;
  };
}

const initialInput: IInput = {
  email: { value: "", isValid: false },
  newsletter: {
    value: { value: ENEWS_LETTER.MONTHLY, label: ENEWS_LETTER.MONTHLY },
    isValid: false,
  },
};

const newsLetterOptions = [
  { value: ENEWS_LETTER.DAILY, label: ENEWS_LETTER.DAILY },
  { value: ENEWS_LETTER.WEEKLY, label: ENEWS_LETTER.WEEKLY },
  { value: ENEWS_LETTER.MONTHLY, label: ENEWS_LETTER.MONTHLY },
];

export interface IFormTwo {
  email: string;
  newsletter: ENEWS_LETTER;
}

interface IProps {
  preview(data: IFormTwo): void;
  submitUser(data: IFormTwo): void;
  initialValue: IFormTwo;
}

export const FormTwo = (props: IProps) => {
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
      email: {
        value: props.initialValue.email,
        isValid: props.initialValue.email ? true : false,
      },
      newsletter: {
        value: {
          value: props.initialValue.newsletter,
          label: props.initialValue.newsletter,
        },
        isValid: props.initialValue.newsletter ? true : false,
      },
    };
    setInputs(newData);
  }, [props.initialValue]);

  /**
   * handleEmail function store input changes for email in inputs state
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   * @param e - The first input is onchange event object
   *
   * @beta
   */
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    let isValid: boolean = AppRegex.email.test(e.target.value);
    setInputs({
      ...inputs,
      [e.target.name]: { value: e.target.value, isValid },
    });
  };

  /**
   * handleNewsletter function store input changes for newsletter in inputs state
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   * @param value - The first input is onchange event object which is the selected option data
   *
   * @beta
   */

  const handleNewsletter = (value: ValueType<ISelect, false>) => {
    setInputs({
      ...inputs,
      newsletter: { value: value!, isValid: true },
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
    return inputs.email.isValid;
  };

  /**
   * handlePreview function prepare data to user state in parent component and call props.preview fun
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   *
   * @beta
   */

  const handlePreview = () => {
    const data: IFormTwo = {
      email: inputs.email.value,
      newsletter: inputs.newsletter.value.value,
    };
    props.preview(data);
  };

  /**
   * handleSubmitUser function prepare data to user state in parent component and call props.submitUser fun
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   *
   * @beta
   */

  const handleSubmitUser = () => {
    const data: IFormTwo = {
      email: inputs.email.value,
      newsletter: inputs.newsletter.value.value,
    };
    props.submitUser(data);
  };

  return (
    <>
      <div className="m-1">
        <AppInput
          lable={`${translator.email}:`}
          required
          name="email"
          onChange={handleEmail}
          value={inputs.email.value}
        />
      </div>
      <div className="m-1 form-group">
        <label>{`${translator.newsletter}:`}</label>
        <Select
          name="newsletter"
          options={newsLetterOptions}
          required
          value={inputs.newsletter.value}
          onChange={handleNewsletter}
        />
      </div>
      <div className="mt-4 d-flex justify-content-end">
        <AppButton
          style={{ marginRight: ".2rem" }}
          title={translator.preview}
          btnClassName="btn-secondary"
          onClick={handlePreview}
        />
        <AppButton
          title={translator.createUser}
          btnClassName="btn-primary"
          onClick={handleSubmitUser}
          disabled={!validation()}
        />
      </div>
    </>
  );
};
