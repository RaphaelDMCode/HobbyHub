// ---[Connects the React App to the Supabase]--- //
import { createClient } from "@supabase/supabase-js"

const URL = "https://hdeeauopcuxgrkgudtcb.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkZWVhdW9wY3V4Z3JrZ3VkdGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NDUzNDMsImV4cCI6MjA3ODIyMTM0M30.liN3aJyzE5H0HkRsMu2VWu83vrIQlMh8CNQuVJ17I30";

export const supabase = createClient(URL, API_KEY);