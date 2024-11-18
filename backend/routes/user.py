from flask import Flask, jsonify
from supabase import Client

from auth.authenticate_user import authenticate_user

# Put routes for users (profile, following) here
def UserRoutes(app: Flask, supabase: Client):
    # Get user profile data
    @app.route("/me", methods=["GET"])
    @authenticate_user(supabase)
    def get_user(user_id):
        try:
            response = (
                supabase.table("users")
                .select("*")
                .eq("supabase_id", user_id)
                .execute()
            )

            if not response.data:
                return jsonify({"error": "User not found"}), 404

            return jsonify(response.data[0]), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    # Get clubs the user is following
    @app.route("/me/following", methods=["GET"])
    @authenticate_user(supabase)
    def get_following(user_id):
        try:
            user_response = (
                supabase.table("users")
                #assuming we are gonna add a field for the clubs a user is following
                .select("following_club_ids")  
                .eq("user_id", user_id)
                .execute()
            )

            if not user_response.data or not user_response.data[0].get("following_club_ids"):
                return jsonify({"message": "User is not following any clubs"}), 200

            club_ids = user_response.data[0]["following_club_ids"]

            club_response = (
                supabase.table("clubs")
                .select("club_id, name")
                .in_("club_id", club_ids)
                .execute()
            )

            if not club_response.data:
                return jsonify({"message": "No matching clubs found"}), 404

            return club_response.data, 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500