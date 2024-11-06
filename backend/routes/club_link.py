from flask import Flask, jsonify, request
from auth import authenticate_club_admin
from supabase import Client

# Put club link routes here (creating, reading, updating, deleting)
def ClubLinkRoutes(app: Flask, supabase: Client):

    @app.route("/club/<club_id>/links/<link_id>", methods=["PUT"])
    @authenticate_club_admin(supabase)
    def update_club_link(club_id, link_id, admin_id):
        try:
            data = request.json
            
            if not data:
                return jsonify({"error": "No data provided"}), 400

            response = (
                supabase.table("Club_link")
                .update(data)
                .eq("club_id", club_id)
                .eq("link_id", link_id)
                .execute()
            )

            if not response.data:
                return jsonify({"error": "Club link not found"}), 404

            return jsonify({"message": "Club link updated successfully", "updated_club_link": response.data})
        except Exception as e:
            return jsonify({"error": str(e)}), 400