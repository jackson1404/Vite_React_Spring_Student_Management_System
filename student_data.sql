--
-- PostgreSQL database dump
--

-- Dumped from database version 10.23
-- Dumped by pg_dump version 10.23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    student_id integer NOT NULL,
    student_name character varying(50),
    student_age integer,
    student_email character varying(100),
    student_address character varying(255),
    student_phone character varying(100),
    student_file bytea
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Name: students_student_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.students_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_student_id_seq OWNER TO postgres;

--
-- Name: students_student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.students_student_id_seq OWNED BY public.students.student_id;


--
-- Name: students student_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students ALTER COLUMN student_id SET DEFAULT nextval('public.students_student_id_seq'::regclass);


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (student_id, student_name, student_age, student_email, student_address, student_phone, student_file) FROM stdin;
30	Phyoe	21	phyoe@gmail.com	mdy	09-28893	\N
31	Justin	22	justin@gmail.com	ygn	098862882	\N
32	Okie	30	oke@gmail.com	Gung	0928833	\N
35	Yu	21	yu@gmail.com	Mdy	09520	\N
36	Xin	21	xin@gmail.com	Mdy	0929838388	\N
37	winmin	40	winmin@gmail.com	Mdy	0920881118	\N
39	wai phyo	24	phyo@gmail.com	Mdy	09277333	\N
38	xin yu	21	xinyu@gmail.com	Mdy	0927291188	\N
29	Joker	20	joker@gmail.com	Bago	0923992	\N
27	Tww	20	tww@gmail.com	Mdy	0938822188	\N
33	Fikol	33	fikol@gmail.com	Myd	092781109	\N
46	Johsep	39	johsep@gmail.com	Taunggyii	097499333	\N
7	Jackson	29	win@gmail.com	092229993	mdy	\N
47	Kulili	39	kulili@gmail.com	Yangon	09-3918822	\N
49	Arai	39	arai@gmail.com	Austrilia	0927495782	\N
50	Kai	18	kai@gmail.com	Mdy	097947911	\N
51	Muni	40	muni@gmail.com	Guimm	092891111	\N
52	Sula	39	sula@gmail.com	Korea	028239933	\N
53	Duku	29	duku@gmail.com	Mdy	098726181	\N
\.


--
-- Name: students_student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_student_id_seq', 53, true);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (student_id);


--
-- PostgreSQL database dump complete
--

