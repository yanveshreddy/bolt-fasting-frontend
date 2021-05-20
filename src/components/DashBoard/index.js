import React, { useEffect, useState } from "react";
import "./index.css";
import { withRouter } from "react-router-dom";
import WeeklyFastingGraph from "../WeeklyFastingGraph";
import Timer from "../Timer";
import StatContainer from "../StatContainer";
import Cookies from "js-cookie";

const Dashboard = (props) => {
  const { history } = props;
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    history.push("/login");
  }
  const [isReload, setReload] = useState(false);
  useEffect(() => {
    //do nothing
  }, [isReload]);
  return (
    <div className="container bg-container mt-5">
      <div className="row">
        <div className="col-12 col-md-5 mb-5">
          <Timer callBack={setReload} />
        </div>
        <div className="col-12 col-md-7 mb-5">
          <WeeklyFastingGraph />
        </div>
        <div className="col-12">
          <StatContainer />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
