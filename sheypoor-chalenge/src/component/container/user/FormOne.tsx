import React, { ChangeEvent, useState } from "react";
import { AppButton } from "../../share/form/Button";
import { AppInput } from "../../share/form/Input";
import { ENEWS_LETTER } from "./enum";

interface IInput {
  name: { value: string; isValid: boolean };
  age: { value: number; isValid: boolean };
  //  email: {value:string, isValid:boolean};
  // newsletter: {value:ENEWS_LETTER, isValid:boolean};
}

const initialInput: IInput = {
  name: { value: "", isValid: false },
  age: { value: 0, isValid: false },
  // email:{value:"", isValid:false},
  // newsletter:{value:ENEWS_LETTER.MONTHLY, isValid:false}
};

export const FormOne = () => {
  const [inputs, setInputs] = useState<IInput>(initialInput);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let isValid: boolean = e.target.value ? true : false;
    setInputs({
      ...inputs,
      [e.target.name]: { value: e.target.value, isValid },
    });
    console.log(e.target.name, e.target.value);
  };

  const disabled = (): boolean => {
    if (inputs.name.isValid && inputs.age.isValid) {
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="m-1">
        <AppInput lable="name:" required name="name" onChange={handleChange} />
      </div>
      <div className="m-1">
        <AppInput
          lable="age:"
          name="age"
          type="number"
          required
          onChange={handleChange}
        />
      </div>
      <div className="m-1 d-flex justify-content-end">
        <AppButton
          title="next"
          btnClassName="btn-primary"
          disabled={disabled()}
        />
      </div>
    </>
  );
};
