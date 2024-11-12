from flask import Flask, request, jsonify
from supabase import Client
from datetime import datetime

#from auth.authenticate_club_admin import authenticate_club_admin

# Put routes for club events here (getting event of specific club, creating event for club, etc.)
def ClubEventRoutes(app: Flask, supabase: Client):

    @app.route('/club/<int:club_id>/events', methods=['POST'])
    #@authenticate_club_admin(supabase)
    def create_event(club_id):
        data = request.json
        event_name = data.get("event_name")
        event_date = data.get("event_date")
        event_time = data.get("event_time", "No time sepcified")
        description = data.get("description", "No description yet")

        if not event_name or not event_date:
            return jsonify({"error": "event_name and event_date are required fields"}), 400
        
        """"
        Will uncomment/fix after looking into supabase date/time formats
        try:
            event_date = datetime.strptime(event_date, "%Y-%m-%d").isoformat()
        except ValueError:
            return jsonify({"error": "event_date must be in the format YYYY-MM-DD"}), 400
        """
            
        response = supabase.table("events").insert({
            "club_id": club_id,
            "event_name": event_name,
            "event_date": event_date,
            "event_time": event_time,
            "description": description
        }).execute()

        if response.status_code == 201:
            return jsonify(response.data), 201
        else:
            return jsonify({"error": response.error_message}), 500
    
    @app.route("/club/<club_id>/events/<event_id>", methods=["DELETE"])
    @authenticate_club_admin(supabase)
    def delete_event(club_id, event_id, admin_id):
        try:
            response = supabase.table("events").delete().eq("club_id", club_id).eq("event_id", event_id).execute()
            
            if not response.data:
                return jsonify({"error": "Event not found"}), 404
            
            return {}, 200
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
