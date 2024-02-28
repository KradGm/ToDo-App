import { Alert, AlertProps } from "antd";


type Props = {
 setError:(bool:boolean)=>void;
 message:(string);
 type:(AlertProps["type"]);
};

export const AlertComp:React.FC<Props> = ({setError,message,type}) => {
  return <Alert message={message} type={type} showIcon closable onClose={()=>setError(false)} />;
};
