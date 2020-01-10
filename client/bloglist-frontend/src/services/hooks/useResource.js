import { useState } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  const [token, setCurrentToken]= useState(null);

  const setToken = (newToken) => {
    setCurrentToken(`bearer ${newToken}`);
  };

  const create = async (resource) => {
    const config = {
      headers: { Authorization: token },
    };
    //console.log(config);
    await axios.post(baseUrl, resource, config); 
  };

  const getAll = async () => {
    const request = await axios.get(baseUrl);
    setResources(request.data);
  };

  const update = async (id, resource) => {
    const config={
      headers:{ Authorization: token},
    }
  
    try {
      //console.log(config);
      await axios.put(`${baseUrl}/${id}`, resource, config);
      return false;
    }
    catch (e) {
      setResources(resources.filter((n) => n.id !== id));
      return e;
    }
  };

  const remove= async (id) =>{
    const config={
      headers:{ Authorization: token},
    }
    await axios.delete(`${baseUrl}/${id}`,config)
  }

  const service = {
    create, getAll, update, setToken, remove
  };

  return [
    resources, service,
  ];
};

export default useResource;
