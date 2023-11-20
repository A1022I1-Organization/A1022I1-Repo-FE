import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

export const PrivateRoutes = (props) => {
    const account = useSelector((store) => store.auth);
    // account.accountRole.appRole.name
  return (
    <>
      <Route path={props.path} Component={props.Component} />
    </>
  );
};
