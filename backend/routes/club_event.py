from flask import Flask, jsonify, request
from auth import authenticate_club_admin
from supabase import Client

# Put routes for club events here (getting event of specific club, creating event for club, etc.)
def ClubEventRoutes(app: Flask, supabase: Client):
    
    @app.route("/club/<club_id>/events/<event_id>", methods=["PUT"])
    @authenticate_club_admin(supabase)
    def update_event(club_id, event_id, admin_id):
        try:
            data = request.json
            
            if not data:
                return jsonify({"error": "No data provided"}), 400

            response = (
                supabase.table("events")
                .update(data)
                .eq("club_id", club_id)
                .eq("event_id", event_id)
                .execute()
            )

            if not response.data:
                return jsonify({"error": "Event not found"}), 404

            return jsonify({response.data})
        except Exception as e:
            return jsonify({"error": str(e)}), 500