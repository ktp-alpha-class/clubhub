from flask import Flask, jsonify
from supabase import Client

# Put routes for users (profile, following) here
def UserRoutes(app: Flask, supabase: Client):
    # Get user profile data
    @app.route("/user")
    def get_examples():
        profile_data = supabase.table("User").select("username").execute()
        return jsonify(profile_data.data)