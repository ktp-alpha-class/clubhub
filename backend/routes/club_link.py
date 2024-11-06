from flask import Flask, jsonify
from flask import Flask, jsonify, request
from auth import authenticate_club_admin
from supabase import Client

# Put club link routes here (creating, reading, updating, deleting)
def ClubLinkRoutes(app: Flask, supabase: Client):
 
    @app.route("/club/<club_id>/club_link/<link_id>", methods=["POST"])
    @authenticate_club_admin(supabase)
    def create_link(club_id):
        try:
            data = request.json

            link_id = data.get("link_id")
            link_name = data.get("link_name")
            link_url = data.get("link_url")

            if not link_id or not link_name or not link_url
                return jsonify({"error": "required field for club link are not present"}), 400

            response = supabase.table("club_link").insert({
                "club_id": club_id,
                "link_id": link_id,
                "link_name": link_name,
                "link_url": link_url
            })
            .execute()

            if response.status_code == 201:
                return jsonify({"message": "Link added successfully", "data": response.data}), 201
            else:
                return jsonify({"error": "Failed to add link", "details": response.error_message}), 500

