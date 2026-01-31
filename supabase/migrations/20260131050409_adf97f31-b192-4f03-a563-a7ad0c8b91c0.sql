-- Create leads table for contact form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_name TEXT,
  revenue_range TEXT,
  bookkeeping_tool TEXT,
  message TEXT,
  source TEXT DEFAULT 'contact_form',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on leads (public insert, no read)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert leads (public contact form)
CREATE POLICY "Anyone can submit leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Create intakes table for detailed intake form submissions
CREATE TABLE public.intakes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Business Info
  legal_name TEXT NOT NULL,
  dba TEXT,
  industry TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  state_province TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'USA',
  -- Contact Info
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  -- Accounting Setup
  accounting_platform TEXT NOT NULL,
  bank_accounts TEXT NOT NULL,
  credit_cards TEXT,
  merchant_accounts TEXT,
  transaction_volume TEXT NOT NULL,
  -- Services & Notes
  services_needed TEXT[] NOT NULL DEFAULT '{}',
  notes TEXT,
  file_urls TEXT[],
  -- Metadata
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on intakes (public insert, no read)
ALTER TABLE public.intakes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert intakes (public intake form)
CREATE POLICY "Anyone can submit intakes"
ON public.intakes
FOR INSERT
WITH CHECK (true);

-- Create storage bucket for intake file uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('intake-files', 'intake-files', false);

-- Allow anyone to upload to intake-files bucket
CREATE POLICY "Anyone can upload intake files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'intake-files');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on intakes
CREATE TRIGGER update_intakes_updated_at
BEFORE UPDATE ON public.intakes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();