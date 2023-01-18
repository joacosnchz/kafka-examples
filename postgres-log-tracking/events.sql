CREATE TABLE public.events
(
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.events
    OWNER to admin;

INSERT INTO public.events(id, name) values(3,'Joaquin');

UPDATE public.events SET name='joaquin 3' WHERE id=3;

DELETE FROM public.events WHERE id=3;
