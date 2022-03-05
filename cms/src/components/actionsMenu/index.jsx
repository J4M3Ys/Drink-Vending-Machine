import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import DeleteModal from "components/modal/delete";

export default function Index({
  product,
  productPath,
  edit,
  editPath,
  del,
  id,
  schemas,
  getData,
}) {
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

  return (
    <>
      <Menu
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        {product && (
          <Menu.Item key="0" style={{ margin: 0 }}>
            <Link to={productPath}>
              <FolderViewOutlined /> View Product
            </Link>
          </Menu.Item>
        )}
        {edit && (
          <Menu.Item key="2" style={{ margin: 0 }}>
            <Link to={editPath}>
              <EditOutlined /> Edit
            </Link>
          </Menu.Item>
        )}
        {del && (
          <Menu.Item
            key="3"
            style={{ margin: 0 }}
            onClick={() => setVisibleDeleteModal(true)}
          >
            <DeleteOutlined /> Delete
          </Menu.Item>
        )}
      </Menu>
      <DeleteModal
        visible={visibleDeleteModal}
        setVisible={setVisibleDeleteModal}
        id={id}
        schemas={schemas}
        getData={getData}
      />
    </>
  );
}
