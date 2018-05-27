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
  title VARCHAR(50) NOT NULL,
  userId int references users(id),
  department text NOT NULL,
  details text,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  createdat TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedat TIMESTAMP NOT NULL DEFAULT NOW()
  );
  `;

export default dataBase;
