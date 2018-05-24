const dataBase = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL primary key,
  fullName text NOT NULL,
  email text NOT NULL,
  password text NOT NULL
);                  

DROP TABLE IF EXISTS requests;
CREATE TABLE requests (
  id SERIAL primary key,
  userId int references users(id),
  location text NOT NULL,
  details text
  );
  `;

export default dataBase;
