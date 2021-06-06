import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  btnClassName?: string;
}

export function AppButton(props: ButtonProps) {
  /**
   * buttonOriginAttr function prepare props to copy in main element
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   * @param props - The first input is ButtonProps
   *
   * @returns new props for button element
   *
   * @beta
   */
  function buttonOriginAttr(props: ButtonProps): ButtonProps {
    let newP = { ...props };
    delete newP.className;
    delete newP.btnClassName;

    return newP;
  }

  return (
    <button
      className={`btn ${props.btnClassName ? props.btnClassName : ""}`}
      {...buttonOriginAttr(props)}
    >
      {props.title}
    </button>
  );
}
