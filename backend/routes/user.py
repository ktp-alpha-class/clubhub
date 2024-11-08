from flask import Flask, jsonify
from supabase import Client

from backend.auth.authenticate_user import authenticate_user

# Put routes for users (profile, following) here
def UserRoutes(app: Flask, supabase: Client):
    # Get user profile data
    @app.route("/user/<user_id>")
    @authenticate_user(supabase)
    def get_me(user_id):
        try:
            response = (
                supabase.table("Users")
                .select("*")
                .eq("user_id", user_id)
                .execute()
            )

            if not response.data:
                return jsonify({"error": "User not found"}), 404

            return jsonify({"user": response.data[0]}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 400