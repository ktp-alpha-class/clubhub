from flask import Flask, jsonify
from supabase import Client

# Put routes for club events here (getting event of specific club, creating event for club, etc.)
def ClubEventRoutes(app: Flask, supabase: Client):
    
    @app.route("/club/<club_id>/events/<event_id>", methods=["DELETE"])
    def delete_event(club_id, event_id):
        try:
            response = supabase.table("events").delete().eq("club_id", club_id).eq("event_id", event_id).execute()
            
            if not response.data:
                return jsonify({"error": "Event not found"}), 404
            
            return jsonify({"message": "Event deleted successfully"})
        except Exception as e:
            return {"error": str(e)}, 400