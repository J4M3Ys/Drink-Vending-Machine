import "./App.less";
import PublicRoute from "components/routes/publicRoute";
import PrivateRoute from "components/routes/privateRoute";
import { Routes, Route } from "react-router-dom";
import Layout from "components/layout";
import LoginForm from "pages/login";
import RegisterForm from "pages/register";
import { UserContext } from "core/services/hook/context/store";
import { useState } from "react";

function App() {
  const [me, setMe] = useState({});

  return (
    <UserContext.Provider value={[me, setMe]}>
      <Routes>
        {/*Public Route*/}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>

        {/*Private Route*/}
        <Route element={<PrivateRoute />}>
          <Route path="/*" element={<Layout />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
