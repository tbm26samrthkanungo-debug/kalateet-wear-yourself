CREATE TABLE public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  product_id uuid REFERENCES public.products(id),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist" ON public.waitlist
  FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "No public read on waitlist" ON public.waitlist
  FOR SELECT TO public
  USING (false);
