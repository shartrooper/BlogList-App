const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    likes:14,
    title:"Pools of Radiance",
    author:"Gorath the Moredhel",
    url:"https://KrondorThisWay.com",
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    },
  },
  {
    id: '5d990b2e5a9393097436c219',
    likes:10,
    title:"Marianas blog",
    author:"Saltiest Deep",
    url:"https://goindarkbasin.com",
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    },
  },
  {
    id: '5d9a80c7018c1b16d8148a59',
    likes:3,
    title:"Cancerous blog",
    author:"More cancer than ever",
    url:"https://cringy-as-hell.com",
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    },
  }
];


let token= null;

/* The getAll function returns a list of notes wrapped inside a promise
with the Promise.resolve method.This is done because our application expects
a promise when it uses the method. */

const getAll = () => Promise.resolve(blogs);

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll,setToken };
