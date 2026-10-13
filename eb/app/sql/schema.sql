CREATE TABLE public.questions (
  uuid UUID DEFAULT  uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  choice_a TEXT NOT NULL,
  choice_b TEXT NOT NULL,
  choice_c TEXT NOT NULL,
  choice_d TEXT NOT NULL,
  answer   CHAR(1) NOT NULL
);


CREATE TABLE public.answers (
  uuid        UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES public.questions(uuid),
  selected    CHAR(1) NOT NULL,
  is_correct  BOOLEAN NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);


