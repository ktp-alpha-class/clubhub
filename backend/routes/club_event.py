from flask import Flask, request, jsonify
from supabase import Client

#from auth.authenticate_club_admin import authenticate_club_admin

# Put routes for club events here (getting event of specific club, creating event for club, etc.)
def ClubEventRoutes(app: Flask, supabase: Client):

    @app.route('/club/<int:club_id>/events', methods=['POST'])
    #@authenticate_club_admin(supabase)
    def add_event(club_id):
        data = request.json
        event_name = data.get("event_name")
        event_date = data.get("event_date")
        description = data.get("description")

        if not event_name or not event_date:
            return jsonify({"error": "event_name and event_date are required fields"}), 400

        response = supabase.table("events").insert({
            "club_id": club_id,
            "event_name": event_name,
            "event_date": event_date,
            "description": description
        }).execute()

        if response.status_code == 201:
            return jsonify({"message": "Event added successfully", "data": response.data}), 201
        else:
            return jsonify({"error": "Failed to add event", "details": response.error_message}), 500   