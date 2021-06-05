import { InputHTMLAttributes, useRef } from "react";
import { translator } from "../../../../constant/translator";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  lable?: string;
  required?: boolean;
}

export function AppInput(props: InputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function inputOriginAttr(props: InputProps): InputProps {
    let newP = { ...props };
    return newP;
  }

  return (
    <div className="form-group">
      <label>{props.lable}</label>
      {props.required ? <span className="text-danger">*</span> : ""}
      <input
        className="form-control"
        {...inputOriginAttr(props)}
        ref={inputRef}
      />
    </div>
  );
}
