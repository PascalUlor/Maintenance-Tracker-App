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
    userId: 3,
    location: 'Lagos',
    Details: 'Air conditioner is faulty'
  },
  {
    id: 2,
    userId: 1,
    location: 'Jos',
    Details: 'Systems are bad'
  },
  {
    id: 2,
    userId: 2,
    location: 'Imo',
    Details: 'Systems overload'
  },
  {
    id: 2,
    userId: 1,
    location: 'Abuja',
    Details: 'Kitchen equipements'
  },
  {
    id: 2,
    userId: 2,
    location: 'Kadunna',
    Details: 'Kitchen equipements'
  }
];


const db = { userDataBase, requestDataBase };

export default db;
