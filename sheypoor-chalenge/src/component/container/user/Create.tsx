/// <reference path='../../../@type/sdk.d.ts' />
import * as sdk from "sdk";
import style from "./create.module.scss";

import React, { useState } from "react";
import { IUser } from "../../../model/user.model";
import FormBox from "../../share/FormBox";
import { ENEWS_LETTER } from "./enum";
import { FormOne, IFormOne } from "./FormOne";
import { FormTwo, IFormTwo } from "./FormTwo";
import { Step } from "../../share/Step";
// import { createUser } from 'sdk'

let newSdk: any = sdk;

const initialUser: IUser = {
  name: "",
  age: 0,
  email: "",
  newsletter: ENEWS_LETTER.MONTHLY,
};

export const CreateUser = () => {
  const [current, setCurrent] = useState<number>(1);
  const [user, setUser] = useState<IUser>(initialUser);

  const next = (values: IFormOne) => {
    setUser({ ...user, ...values });
    setCurrent(2);
  };

  const preview = (values: IFormTwo) => {
    setUser({ ...user, ...values });
    setCurrent(1);
  };

  const submitUser = (values: IFormTwo) => {
    let newUser: IUser = { ...user, ...values };
    createUser(newUser);
  };

  const initialFormOne = (): IFormOne => {
    return {
      name: user.name,
      age: user.age,
    };
  };

  const initialFormTwo = (): IFormTwo => {
    return {
      email: user.email,
      newsletter: user.newsletter,
    };
  };

  const createUser = async (user: IUser) => {
    try {
      let res = await newSdk.createUser(user);
      alert("User Create");
    } catch (error) {
      alert("There is a problem");
    }
  };



  return (
    <div className={style.createWrapper}>
      <Step stepsNumber={2} activeStep={current} />

      <FormBox title="create user">
        {current === 1 ? (
          <FormOne next={next} initialValue={initialFormOne()} />
        ) : (
          <FormTwo
            preview={preview}
            submitUser={submitUser}
            initialValue={initialFormTwo()}
          />
        )}

        <div className="m-1 d-flex justify-content-end"></div>
      </FormBox>
    </div>
  );
};
