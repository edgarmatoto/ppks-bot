--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg120+1)
-- Dumped by pg_dump version 15.4 (Debian 15.4-1.pgdg120+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: faq; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faq (
    id integer NOT NULL,
    topik text,
    deskripsi text
);


ALTER TABLE public.faq OWNER TO postgres;

--
-- Name: faq_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faq_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faq_id_seq OWNER TO postgres;

--
-- Name: faq_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faq_id_seq OWNED BY public.faq.id;


--
-- Name: konseling; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.konseling (
    id integer NOT NULL,
    nama character varying(100),
    kontak character varying(50),
    status character varying(20)
);


ALTER TABLE public.konseling OWNER TO postgres;

--
-- Name: konseling_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.konseling_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.konseling_id_seq OWNER TO postgres;

--
-- Name: konseling_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.konseling_id_seq OWNED BY public.konseling.id;


--
-- Name: laporan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.laporan (
    id integer NOT NULL,
    kontak character varying(50),
    usia integer,
    jenis_kelamin character varying(50),
    deskripsi text
);


ALTER TABLE public.laporan OWNER TO postgres;

--
-- Name: laporan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.laporan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.laporan_id_seq OWNER TO postgres;

--
-- Name: laporan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.laporan_id_seq OWNED BY public.laporan.id;


--
-- Name: faq id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq ALTER COLUMN id SET DEFAULT nextval('public.faq_id_seq'::regclass);


--
-- Name: konseling id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.konseling ALTER COLUMN id SET DEFAULT nextval('public.konseling_id_seq'::regclass);


--
-- Name: laporan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laporan ALTER COLUMN id SET DEFAULT nextval('public.laporan_id_seq'::regclass);


--
-- Data for Name: faq; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faq (id, topik, deskripsi) FROM stdin;
1	Faktor Risiko Kekerasan Seksual	Faktor risiko kekerasan seksual adalah kondisi, situasi, atau perilaku yang meningkatkan kemungkinan terjadinya kekerasan seksual. Beberapa faktor risiko yang dapat mempengaruhi kejadian kekerasan seksual antara lain lingkungan yang tidak aman, paparan pada konten pornografi yang eksploitatif, ketidakadilan gender, adanya konflik atau perang, serta konsumsi alkohol dan narkoba.
2	Peran Pendidikan Seksual dalam Pencegahan	Pendidikan seksual yang komprehensif dapat berperan penting dalam pencegahan kekerasan seksual. Dengan memberikan pengetahuan tentang batasan tubuh, hak-hak pribadi, dan mengajarkan cara berkomunikasi yang sehat dalam hubungan, pendidikan seksual membantu meningkatkan kesadaran dan keberanian individu untuk melawan tindakan kekerasan dan melindungi diri serta orang lain dari bahaya kekerasan seksual.
3	Pelayanan Dukungan untuk Korban	Pelayanan dukungan yang komprehensif dan sensitif terhadap kekerasan seksual sangat penting bagi para korban. Layanan ini mencakup dukungan emosional, konseling, dan bantuan medis. Lembaga perlindungan korban kekerasan seksual dan pusat krisis juga menyediakan informasi hukum dan bantuan untuk melaporkan kejadian ini ke pihak berwenang.
4	Peran Teknologi dalam Pencegahan dan Pelaporan	Teknologi dapat berperan dalam pencegahan dan penanganan kekerasan seksual dengan menyediakan platform untuk kampanye kesadaran, pendidikan, dan dukungan. Aplikasi keamanan atau tombol darurat di ponsel pintar dapat membantu seseorang memanggil bantuan dalam situasi darurat. Selain itu, teknologi juga dapat digunakan untuk melaporkan kejadian kekerasan seksual kepada pihak berwenang dengan lebih mudah dan anonim.
5	Pencegahan Kekerasan Seksual di Tempat Kerja	Pencegahan kekerasan seksual di tempat kerja melibatkan pembuatan kebijakan dan prosedur yang jelas, pelatihan karyawan tentang etika dan pencegahan kekerasan seksual, serta menciptakan lingkungan kerja yang aman dan terbuka untuk melaporkan insiden kekerasan.
6	Tanda-Tanda Awas Kekerasan Seksual pada Remaja	Tanda-tanda awas kekerasan seksual pada remaja meliputi perubahan drastis dalam perilaku, penurunan performa akademik, isolasi sosial, dan kemunculan luka atau cedera yang tidak dapat dijelaskan.
7	Kesetaraan Gender dalam Pencegahan Kekerasan Seksual	Pentingnya kesetaraan gender dalam pencegahan kekerasan seksual menekankan perlunya menghilangkan norma-norma patriarki dan menciptakan masyarakat yang menghormati hak-hak dan kebebasan semua individu, tanpa memandang gender.
8	Tindakan Hukum dalam Penanganan Kekerasan Seksual	Tindakan hukum yang efektif dalam penanganan kekerasan seksual melibatkan penegakan hukum yang tegas terhadap pelaku, perlindungan korban selama proses hukum, dan memastikan adanya akses keadilan bagi semua pihak yang terlibat.
\.


--
-- Data for Name: konseling; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.konseling (id, nama, kontak, status) FROM stdin;
\.


--
-- Data for Name: laporan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.laporan (id, kontak, usia, jenis_kelamin, deskripsi) FROM stdin;
1	@todlymodly	14	perempuan	saya ingin melaporkan bahwa seseorang telah mengalami pelecehan seksual pada hari senin tanggal 12 mei 2023 di lingkungan kampus xyz
2	@todlymodly	14	perempuan	saya ingin melaporkan bahwa seseorang telah mengalami pelecehan seksual pada hari senin tanggal 12 mei 2023 di lingkungan kampus xyz
3	@todlymodly	14	perempuan	saya ingin melaporkan bahwa seseorang telah mengalami pelecehan seksual pada hari senin tanggal 12 mei 2023 di lingkungan kampus xyz
4	@todlymodly	14	perempuan	saya ingin melaporkan bahwa seseorang telah mengalami pelecehan seksual pada hari senin tanggal 12 mei 2023 di lingkungan kampus xyz
5	@eddytungadi	18	laki	lapor
\.


--
-- Name: faq_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faq_id_seq', 8, true);


--
-- Name: konseling_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.konseling_id_seq', 1, false);


--
-- Name: laporan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.laporan_id_seq', 5, true);


--
-- Name: faq faq_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq
    ADD CONSTRAINT faq_pkey PRIMARY KEY (id);


--
-- Name: konseling konseling_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.konseling
    ADD CONSTRAINT konseling_pkey PRIMARY KEY (id);


--
-- Name: laporan laporan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laporan
    ADD CONSTRAINT laporan_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

