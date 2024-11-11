from flask import Flask, jsonify, request
from auth.authenticate_club_admin import authenticate_club_admin
from supabase import Client

# Put routes for club events here (getting event of specific club, creating event for club, etc.)
def ClubEventRoutes(app: Flask, supabase: Client):

    # importing datetime for 'get_events' method
    import datetime
    
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
    
    @app.route("/club/<club_id>/events", methods=["GET"])
    @authenticate_club_admin(supabase)
    def get_events(club_id, admin_id):

        # assuming some date filters were passed
        start_date = request.args.get("start_date")
        end_date = request.args.get("end_date")

        try:
            query = (supabase.table("events")
                     .select("*")
                     .eq("club_id", club_id))

            # filtering if `start_date` and/or `end_date` are provided (currently guessing that the format is YYYY-MM-DD)
            if start_date:
                try:
                    start_date_parsed = datetime.strptime(start_date, "%Y-%m-%d")
                    query = query.gte("event_date", start_date_parsed.isoformat())
                except ValueError:
                    return jsonify({"error": "Invalid start_date format. Use YYYY-MM-DD."}), 400

            if end_date:
                try:
                    end_date_parsed = datetime.strptime(end_date, "%Y-%m-%d")
                    query = query.lte("event_date", end_date_parsed.isoformat())
                except ValueError:
                    return jsonify({"error": "Invalid end_date format. Use YYYY-MM-DD."}), 400

            response = query.execute()
            return jsonify(response.data), 200 if response.data else jsonify({"message": "No events found"}), 404

        except Exception as e:
            return jsonify({"error": str(e)}), 500
    