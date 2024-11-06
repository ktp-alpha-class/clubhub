from flask import Flask, jsonify
from supabase import Client

# Put club link routes here (creating, reading, updating, deleting)
def ClubLinkRoutes(app: Flask, supabase: Client):

    @app.route("/club/<club_id>/club_link/<link_id>", methods=["GET"])
    def get_club_link(club_id, link_id):
        try:
            response = (
                supabase.table("Club_link")
                .select("*")
                .eq("club_id", club_id)
                .eq("link_id", link_id)
                .execute()
            )

            if not response.data:
                return jsonify({"error": "Club link not found"}), 404

            return jsonify({"club_link": response.data[0]}), 200
        
        except Exception as e:
            return jsonify({"error": str(e)}), 400