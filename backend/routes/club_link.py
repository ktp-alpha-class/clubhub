from flask import Flask, jsonify
from auth.authenticate_club_admin import authenticate_club_admin
from supabase import Client

# Put club link routes here (creating, reading, updating, deleting)
def ClubLinkRoutes(app: Flask, supabase: Client):
 
    @app.route("/club/<club_id>/links", methods=["POST"])
    @authenticate_club_admin(supabase)
    def create_link(club_id):
        try:
            data = request.json

            link_name = data.get("link_name")
            link_url = data.get("link_url")

            if not link_name or not link_url:
                return jsonify({"error": "required field for club link are not present"}), 400

            response = supabase.table("club_links").insert({
                "club_id": club_id,
                "link_name": link_name,
                "link_url": link_url
            }).execute()

            if response.status_code == 201:
                return jsonify({response.data[0]}), 201
            else:
                return jsonify({"error": response.error_message}), 500
        except Exception as e:
            return jsonify({"error": str(e)}), 500


    @app.route("/club/<club_id>/links", methods=["GET"])
    def get_club_links(club_id):
        try:
            response = (
                supabase.table("club_links")
                .select("*")
                .eq("club_id", club_id)
                .execute()
            )

            if not response.data:
                return jsonify({"error": "Club link not found"}), 404

            return response.data, 200
        
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
