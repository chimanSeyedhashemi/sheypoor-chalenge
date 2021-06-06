import React from "react";
import style from "./step.module.scss";

interface IProps {
  stepsNumber: number;
  activeStep: number;
}

/**
 * createSteps function generate an array for create steps
 *
 * @remarks
 * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
 *
 * @param steps - The first input is the number of steps in wizard
 *
 * @returns array of number of steps
 *
 * @beta
 */

const createSteps = (steps: number): Array<number> => {
  let newSteps: Array<number> = [];
  if (steps < 2) return [];
  for (let i = 1; i < steps; i++) {
    newSteps.push(i + 1);
  }

  return newSteps;
};

export const Step = (props: IProps) => {
  return (
    <div className={style.stepWrapper}>
      <div className={props.activeStep === 1 ? style.active : style.step}>
        1
      </div>
      {createSteps(props.stepsNumber).map((step) => {
        return (
          <React.Fragment key={step}>
            <div className={style.connection}></div>
            <div
              className={props.activeStep === step ? style.active : style.step}
            >
              {step}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
