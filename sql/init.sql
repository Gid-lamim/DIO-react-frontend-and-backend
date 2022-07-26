CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS eshop_messages(
    uuid uuid DEFAULT uuid_generate_v4(),
    email VARCHAR NOT NULL,
    message VARCHAR NOT NULL,
    creationdate VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
)

INSERT INTO eshop_messages(email, message, creationdate) VALUES ('admin@goggles.com', 'Produto muito bom', '26/07/22')