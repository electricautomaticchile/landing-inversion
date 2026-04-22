-- 1. Lead status enum + column
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'discarded');

ALTER TABLE public.leads
  ADD COLUMN status public.lead_status NOT NULL DEFAULT 'new';

CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_type ON public.leads(type);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);

-- 2. Allow admins to update leads (e.g. change status)
CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3. Auto-promote the first registered user to admin
CREATE OR REPLACE FUNCTION public.handle_first_user_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only assign admin if there are no existing admins
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_assign_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_first_user_admin();