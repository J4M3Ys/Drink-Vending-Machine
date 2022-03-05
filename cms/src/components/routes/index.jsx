import MachineList from "pages/machine";
import MachineForm from "pages/machine/form";
import MachineProductList from "pages/product";
import ProductForm from "pages/product/form";
import { Routes, Route } from "react-router-dom";
import PageError from "components/routes/pageError";
import { useEffect, useContext } from "react";
import { GetUserData } from "core/services/collections/Generic";
import { user } from "core/config/schemas";
import { UserContext } from "core/services/hook/context/store";
import Dashboard from "pages/dashboard";

export default function Index() {
  const [me, setMe] = useContext(UserContext);
  useEffect(() => {
    GetUser();
  }, []);

  function GetUser() {
    GetUserData(user)
      .then((response) => {
        if (response.code === 200) {
          setMe(response.data);
        }
      })
      .catch((err) => {
        return err;
      });
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/machine" element={<MachineList />} />
      <Route path="/machine/create" element={<MachineForm />} />
      <Route path="/machine/edit/:id" element={<MachineForm />} />
      <Route path="/machine/:id/product" element={<MachineProductList />} />
      <Route path="/machine/:id/product/create" element={<ProductForm />} />
      <Route
        path="/machine/:id/product/edit/:product_id"
        element={<ProductForm />}
      />

      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
