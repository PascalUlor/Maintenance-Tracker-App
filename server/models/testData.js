const userDataBase = [
  {
    id: 1,
    fullName: 'Don Pascal',
    email: 'pc@yahoo.com',
    password: '123'
  },
  {
    id: 2,
    fullName: 'Clark Kent',
    email: 'clark@gmail.com',
    password: '453'
  },
  {
    id: 3,
    fullName: 'Mike',
    email: 'mk@yahoo.com',
    password: '123'
  }
];

const requestDataBase = [
  {
    id: 1,
    location: 'Lagos',
    Details: 'Air conditioner is faulty'
  },
  {
    id: 2,
    location: 'Jos',
    Details: 'Systems are bad'
  }
];


const db = { userDataBase, requestDataBase };

export default db;
