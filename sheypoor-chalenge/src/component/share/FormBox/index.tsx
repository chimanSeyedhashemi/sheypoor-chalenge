import style from "./FormBox.module.scss";
interface IProps {
  children: React.ReactNode;
  title?: string;
}

  /**
   * FormBox componet create a main box for covering form
   *
   * @remarks
   * This method is part of the {@link core-library#syepoor_chalenge | Sheipoor subsystem}.
   *
   * @param props - The props for FormBox component
   *
   * @returns ReactNode 
   *
   * @beta
   */

const FormBox = (props: IProps) => {
  return (
    <>
      <div className={style.generalWrapper}>
        <div className={style.generalBox}>
          {props.title ? (
            <div className={style.headerBox}>
              <h5>{props.title}</h5>
            </div>
          ) : (
            <></>
          )}

          {props.children}
        </div>
      </div>
    </>
  );
};

export default FormBox;
