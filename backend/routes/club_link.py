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
                supabase.table("club_links")
                .update(data)
                .eq("club_id", club_id)
                .eq("link_id", link_id)
                .execute()
            )

            if not response.data:
                return jsonify({"error": "Club link not found"}), 404

            return response.data[0], 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500