from flask import Flask, jsonify
from supabase import Client

# Put general club routes here (info, no links or events stuff)
def ClubRoutes(app: Flask, supabase: Client):
    pass

    @app.route("/club/<club_id>", methods=["PUT"])
    @authenticate_club_admin(supabase)
    def update_event(club_id):
        try:
            data = request.json

            if not data:
                return jsonify({"error": "No data"}), 400

            response = (
                supabase.table("club")
                .update(data)
                .eq("club_id", club_id)
                .execute()
            )

            if not response.data:
                return jsonify({"error": "Data not found"}), 404

            return jsonify({"message": "Event updated successfully", "updated_club": response.data})
        except Exception as e:
            return jsonify({"error": str(e)}), 400