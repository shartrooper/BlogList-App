import { useState } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  const [token, setCurrentToken] = useState(null);

  const setToken = (newToken) => {
    setCurrentToken(`bearer ${newToken}`);
  };

  const create = async (resource) => {
    const config = {
      headers: { Authorization: token },
    };
    let response= await axios.post(baseUrl, resource, config);
    return response.data;
  };

  const getAll = async () => {
    const request = await axios.get(baseUrl);
    return request.data;
  };

  const update = async (id, resource) => {
    const config = {
      headers: { Authorization: token },
    }
    let response= await axios.put(`${baseUrl}/${id}`, resource, config);
    return response.data;
  };

  const remove = async (id) => {
    const config = {
      headers: { Authorization: token },
    }
    await axios.delete(`${baseUrl}/${id}`, config);
  }

  const service = {
    create, getAll, update, setToken, remove, setResources
  };

  return [
    resources, service,
  ];
};

export default useResource;
