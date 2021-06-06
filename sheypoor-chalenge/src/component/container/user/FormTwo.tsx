import React, { ChangeEvent, useEffect, useState } from "react";
import { AppRegex } from "../../../constant/regex";
import { AppButton } from "../../share/form/Button";
import { AppInput } from "../../share/form/Input";
import { ENEWS_LETTER } from "./enum";
import Select, { ActionMeta, ValueType } from "react-select";

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

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    let isValid: boolean = AppRegex.email.test(e.target.value);
    setInputs({
      ...inputs,
      [e.target.name]: { value: e.target.value, isValid },
    });
  };

  const handleNewsletter = (
    value: ValueType<ISelect, false>,
    actionMeta: ActionMeta<ISelect>
  ) => {
    setInputs({
      ...inputs,
      newsletter: { value: value!, isValid: true },
    });
  };

  const disabled = (): boolean => {
    return !inputs.email.isValid;
  };

  const newsLetterOptions = [
    { value: ENEWS_LETTER.DAILY, label: ENEWS_LETTER.DAILY },
    { value: ENEWS_LETTER.WEEKLY, label: ENEWS_LETTER.WEEKLY },
    { value: ENEWS_LETTER.MONTHLY, label: ENEWS_LETTER.MONTHLY },
  ];

  const handlePreview = () => {
    const data: IFormTwo = {
      email: inputs.email.value,
      newsletter: inputs.newsletter.value.value,
    };
    props.preview(data);
  };

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
          lable="email:"
          required
          name="email"
          onChange={handleEmail}
          value={inputs.email.value}
        />
      </div>
      <div className="m-1 form-group">
        <label>newsletter:</label>
        <Select
          lable="newsletter:"
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
          title="Preview"
          btnClassName="btn-secondary"
          onClick={handlePreview}
        />
        <AppButton
          title="Done"
          btnClassName="btn-primary"
          onClick={handleSubmitUser}
          disabled={disabled()}
        />
      </div>
    </>
  );
};
