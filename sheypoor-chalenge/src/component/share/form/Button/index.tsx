import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  btnClassName?: string;
}

export function AppButton(props: ButtonProps) {
  function inputOriginAttr(props: ButtonProps): ButtonProps {
    let newP = { ...props };
    delete newP.className;

    return newP;
  }

  return (
    <button className={`btn ${props.btnClassName}`} {...inputOriginAttr(props)}>
      {props.title}
    </button>
  );
}
