from flask import Flask, jsonify
from supabase import Client

from backend.auth.authenticate_user import authenticate_user

# Put routes for users (profile, following) here
def UserRoutes(app: Flask, supabase: Client):
    # Get user profile data
    @app.route("/user-me")
    @authenticate_user(supabase)
    def get_me(user_id):
        user_data = supabase.table("Users").select("*").execute()
        return jsonify(user_data.data)
