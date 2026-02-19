-- Add explicit SELECT deny policy for intake-files bucket
CREATE POLICY "No public download of intake files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'intake-files' AND false);