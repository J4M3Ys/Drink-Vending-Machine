import { httpClient } from "core/services/httpClient";
import { Logout } from "core/util/logout";

export const CreateData = (schemas, params) => {
  return httpClient
    .post(schemas, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      authCheck(response?.response?.status);
      return response.data || response.data || response.response.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export const UpdateData = (schemas, params, id) => {
  return httpClient
    .put(`${schemas}/${id}`, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      authCheck(response?.response?.status);
      return response.data || response.data || response.response.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export const GetList = (schemas) => {
  return httpClient
    .get(schemas, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      authCheck(response?.response?.status);
      return response.data.data || response.data || response.response.data;
    })
    .catch((err) => {
      console.log("err.response :>> ", err.response);
    });
};

export const GetByID = (schemas, id) => {
  return httpClient
    .get(`${schemas}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      authCheck(response?.response?.status);
      return response?.data || response.data || response.response.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export const DeleteData = (schemas, id) => {
  return httpClient
    .delete(`${schemas}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      authCheck(response?.response?.status);
      return response?.data || response.data || response.response.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export const Login = (schemas, params) => {
  return httpClient
    .put(schemas, params)
    .then((response) => {
      return response?.data || response.data || response.response.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export const GetUserData = (schemas) => {
  return httpClient
    .get(`${schemas}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      authCheck(response?.response?.status);
      return response?.data || response.data || response.response.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export const ReadNotify = (schemas, params) => {
  return httpClient
    .put(`${schemas}`, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      authCheck(response?.response?.status);
      return response?.data || response.data || response.response.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export const UploadFile = (data) => {
  let bodyFormData = new FormData();
  bodyFormData.set("image", data.file);
  return new Promise((reslove) => {
    return httpClient
      .post(`/upload-image`, bodyFormData, {
        onUploadProgress: (e) => {
          data.onProgress({ percent: (e.loaded / e.total) * 100 });
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(
          "response?.data?.data?.imageUrl :>> ",
          response?.data?.data?.url
        );
        const result = {
          name: "fileUploaded",
          status: "done",
          url: response?.data?.data?.url,
          thumbUrl: response?.data?.data?.url,
        };
        data.file.url = response?.data?.data?.url;
        data.onSuccess(null, data?.file);
        return reslove(result);
      })
      .catch((err) => {
        data.onError(err);
        throw err;
      });
  });
};

const authCheck = (status) => {
  if (status) {
    if (status === 401 || status === 403) {
      Logout();
    }
  }
};
