from flask import Flask, jsonify
from auth import authenticate_club_admin
from supabase import Client

# Put general club routes here (info, no links or events stuff)
def ClubRoutes(app: Flask, supabase: Client):
        
    @app.route("/club/<club_id>", methods=["GET"])
    @authenticate_club_admin(supabase)
    def get_club(club_id):
        try:
            response = (
                supabase.table("clubs")
                .select("*")
                .eq("club_id", club_id)
                .execute()
            )

            if not response.data:
                return jsonify({"error": "Club not found"}), 404

            return response.data[0], 200
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500