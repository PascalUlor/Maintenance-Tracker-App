const dataBase = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL primary key,
  fullName text NOT NULL,
  role text NOT NULL,
  email text NOT NULL,
  password text NOT NULL
);
INSERT INTO users (fullName, role, email, password) VALUES ('Pascal', 'Admin', 'pascal@andela.com', 12345);

DROP TABLE IF EXISTS requests;
CREATE TABLE requests (
  id SERIAL primary key,
  userId int references users(id),
  location text NOT NULL,
  details text
  );
  `;

export default dataBase;
