from flask import Flask, jsonify, request
from auth.authenticate_club_admin import authenticate_club_admin
from supabase import Client

# Put routes for club events here (getting event of specific club, creating event for club, etc.)
def ClubEventRoutes(app: Flask, supabase: Client):
    
    @app.route("/club/<club_id>/events/<event_id>", methods=["DELETE"])
    def delete_event(club_id, event_id):
        try:
            response = supabase.table("events").delete().eq("club_id", club_id).eq("event_id", event_id).execute()
            
            if not response.data:
                return jsonify({"error": "Event not found"}), 404
            
            return jsonify({response})
        except Exception as e:
            return {"error": str(e)}, 500
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

            return jsonify(response.data[0])
        except Exception as e:
            return jsonify({"error": str(e)}), 500
