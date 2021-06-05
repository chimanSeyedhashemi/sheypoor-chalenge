import style from "./FormBox.module.scss";
interface IProps {
  children: React.ReactNode;
  title?: string;
}

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
