CREATE DATABASE job_hound

CREATE TABLE company
(
    name char
(40) NOT NULL,
    size int,
    rating int,
    image char
(40),
    PRIMARY KEY
(name)
);

ALTER TABLE company 
ALTER COLUMN size TYPE
VARCHAR,
ALTER COLUMN rating TYPE VARCHAR,
ALTER COLUMN name TYPE TEXT,
ALTER COLUMN image TYPE VARCHAR;

INSERT INTO company
    (name, size, rating, image)
VALUES
    ('Google', '98771', '4.6', 'S3_id_here');

CREATE TABLE post
(
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid
(),
    requirements TEXT NOT NULL,
    industry char
(40) NOT NULL,
    location char
(40),
    position char
(40) NOT NULL,
    description TEXT NOT NULL,
    company_name char
(40) NOT NULL,
    CONSTRAINT fk_company FOREIGN KEY
(company_name) REFERENCES company
(name) ON
DELETE CASCADE
);

ALTER TABLE post
ALTER COLUMN industry TYPE
TEXT,
ALTER COLUMN location TYPE TEXT,
ALTER COLUMN position TYPE TEXT;

INSERT INTO post
    (requirements, industry, location, position, description, company_name)
VALUES
    ('bachelor''s degree in computer science or equivalent, knowledge of data structures and algorithms, knowledge of one or more object oriented programming languages, works well in a team environment', 'software engineering, technology, software development', '1600 Amphitheatre Parkway, Mountain View, California', 'entry level software engineer', 'Join us for a unique 12-14 week paid internship that offers personal and professional development, an executive speaker series, and community-building. The Software Engineering Internship program will give you an opportunity to work on complex computer science solutions, develop scalable, distributed software systems, and also collaborate on multitudes of smaller projects that have universal appeal.', 'Google');