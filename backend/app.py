from flask import Flask
from supabase import create_client

from routes.examples import ExamplesRoutes

SUPABASE_URL = "http://127.0.0.1:54321"
# Replace this by running `npx supabase status` and using "anon key" value
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"


def create_app(): 
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    app = Flask(__name__)

    # Initialize routes here!
    ExamplesRoutes(app, supabase)

    return app