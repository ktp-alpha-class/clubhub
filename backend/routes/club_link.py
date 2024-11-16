from flask import Flask, jsonify
from auth.authenticate_club_admin import authenticate_club_admin
from supabase import Client

# Put club link routes here (creating, reading, updating, deleting)
def ClubLinkRoutes(app: Flask, supabase: Client):

    @app.route("/club/<club_id>/links", methods=["GET"])
    def get_club_link(club_id, link_id):
        try:
            response = (
                supabase.table("club_links")
                .select("*")
                .eq("club_id", club_id)
                .eq("link_id", link_id)
                .execute()
            )

            if not response.data:
                return jsonify({"error": "Club link not found"}), 404

            return response.data[0], 200
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    @app.route('/club/<club_id>/links/<link_id>', methods=['DELETE'])
    @authenticate_club_admin(supabase)
    def delete_club_link(club_id, link_id, admin_id):
        try:
            response = supabase.table('club_links').delete().eq("club_id", club_id).eq("link_id", link_id).execute()

            if not response.data:
                return jsonify({"error": "Club link not found"}), 404
            
            return "", 200
        except Exception as e:
            return {"error": str(e)}, 500
