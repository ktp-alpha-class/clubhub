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

    #user following a club
    @app.route("/me/following/:club-id", methods=["POST"])
    @authenticate_user(supabase)
    def followClub(club_id, user_id):
        try: 
            existing_follow = supabase.table("club_memberships").select("*").eq("user_id", user_id).eq("club_id", club_id).execute()
            #testing if the user already follows that club
            if existing_follow.data
                return jsonify({"error: " "User already follows club"}), 400

            #adding to the club_memberships table 
            response = supabase.table("club_memberships").insert({
                "user_id": user_id
                "club_id": club_id
            }).execute()

            if not response.data
                return jsonify({"error: " response.error_message}), 500

            return jsonify(response.data), 200

        except Exception as e:
            return jsonify({"error", str(e)}), 500

