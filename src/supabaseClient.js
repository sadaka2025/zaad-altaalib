// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// ⚠️ Ici on met seulement la clé anon
const supabaseUrl = "https://ariqdghgxknuvowhgftt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaXFkZ2hneGtudXZvd2hnZnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5OTY4ODYsImV4cCI6MjA3MTU3Mjg4Nn0.-_eB14MgQbXKTOIWIQu34DI-snx7cJSsH62iI6dBuag";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
