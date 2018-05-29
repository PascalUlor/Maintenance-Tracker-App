const database = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL primary key,
  firstName text NOT NULL,
  lastName text NOT NULL,
  role text NOT NULL,
  email text NOT NULL,
  password text NOT NULL
);
INSERT INTO users (firstName, lastName, role, email, password) VALUES ('Pascal', 'Ulor', 'Admin', 'pascal@andela.com', 12345);

DROP TABLE IF EXISTS requests;
CREATE TABLE requests (
  id SERIAL primary key,
  title VARCHAR(50) NOT NULL,
  userId int references users(id),
  department text NOT NULL,
  details text,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  createdat TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedat TIMESTAMP NOT NULL DEFAULT NOW()
  );
  `;

export default database;
