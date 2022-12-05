-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS gh_users cascade;
DROP TABLE IF EXISTS posts_users cascade;

CREATE TABLE gh_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT,
  avatar TEXT
);

CREATE TABLE posts_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  content VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES gh_users(id)
);

INSERT INTO gh_users
(username, email, avatar)
VALUES
('biguser', 'big@user.com', 'https://avatars.githubusercontent.com/u/1?v=4'),
('smalluser', 'smalluser@test.com', 'https://avatars.githubusercontent.com/u/2?v=4'),
('tanner', 'tanner@tanner.com', 'https://avatars.githubusercontent.com/u/3?v=4');

INSERT INTO posts_users
(user_id, content)
VALUES
(1, 'This is a post from biguser'),
(2, 'This is a post from smalluser'),
(3, 'This is a post from tanner'),
(1, 'This is another post from biguser');