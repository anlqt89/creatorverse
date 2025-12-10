import { createClient } from '@supabase/supabase-js';


const URL = 'https://dahmdosyfqknxmvjczek.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhaG1kb3N5ZnFrbnhtdmpjemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzODgwNjksImV4cCI6MjA4MDk2NDA2OX0.DlUWWZR06OgkXEDCj9yVlQzTRcEWblff4VnZ2DsFPmc';
export const supabase = createClient(URL, API_KEY);