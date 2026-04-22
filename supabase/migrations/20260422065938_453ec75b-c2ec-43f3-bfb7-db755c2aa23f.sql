
ALTER TABLE public.leads
  ADD CONSTRAINT leads_name_length CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT leads_email_length CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT leads_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT leads_org_length CHECK (organization IS NULL OR char_length(organization) <= 200),
  ADD CONSTRAINT leads_message_length CHECK (message IS NULL OR char_length(message) <= 2000);
