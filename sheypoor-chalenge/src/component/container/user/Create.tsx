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
import { translator } from "../../../constant/translator";
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

  /**
   * change form from the first to the second in for create user and store user in the user state
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   * @param values - The first input is data from the first form
   *
   * @beta
   */

  const next = (values: IFormOne) => {
    setUser({ ...user, ...values });
    setCurrent(2);
  };

  /**
   * change form from the second to the first in for create user and store user data from form2 in the user state
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   * @param values - The first input is data from the second form
   *
   * @beta
   */

  const preview = (values: IFormTwo) => {
    setUser({ ...user, ...values });
    setCurrent(1);
  };

  /**
   * save user data from form2 in the user store create user and store user in the user state and call createUser request
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   * @param values - The first input is data from the first form
   *
   * @beta
   */

  const submitUser = (values: IFormTwo) => {
    let newUser: IUser = { ...user, ...values };
    createUser(newUser);
  };

  /**
   * initialize form one data from user state
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   * @return required data to form 1
   *
   * @beta
   */
  const initialFormOne = (): IFormOne => {
    return {
      name: user.name,
      age: user.age,
    };
  };

  /**
   * initialize form one data from user state
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   * @return required data for form 2
   *
   * @beta
   */

  const initialFormTwo = (): IFormTwo => {
    return {
      email: user.email,
      newsletter: user.newsletter,
    };
  };

  /**
   * asyncfunction to send data to an virtual server to create user
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   * @param user - The first input is user data
   *
   * @beta
   */

  const createUser = async (user: IUser) => {
    try {
      let res = await newSdk.createUser(user);
      alert(translator.uiMsg.theActionWasSuccesfull);
    } catch (error) {
      alert(translator.uiMsg.thereIsAProblem);
    }
  };

  return (
    <div className={style.createWrapper}>
      <Step stepsNumber={2} activeStep={current} />

      <FormBox title={translator.createUser}>
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
