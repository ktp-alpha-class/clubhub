from flask import Flask, jsonify, request
from supabase import Client

def AuthRoutes(app: Flask, supabase: Client):
    @app.route("/auth/signup", methods=["POST"])
    def signup():
        data = request.get_json()
        try:
            auth_response = supabase.auth.sign_up({
                "email": data["email"],
                "password": data["password"]
            })
            return jsonify(auth_response.user)
        except Exception as e:
            return {"error": str(e)}, 400

    @app.route("/auth/login", methods=["POST"]) 
    def login():
        data = request.get_json()
        try:
            auth_response = supabase.auth.sign_in_with_password({
                "email": data["email"],
                "password": data["password"]
            })
            return jsonify({
                "access_token": auth_response.session.access_token,
                "refresh_token": auth_response.session.refresh_token
            })
        except Exception as e:
            return {"error": str(e)}, 401

    @app.route("/auth/refresh", methods=["POST"])
    def refresh():
        try:
            refresh_token = request.headers.get('Refresh-Token')
            if not refresh_token:
                return {"error": "Refresh token required"}, 401
                
            refresh_response = supabase.auth.refresh_session(refresh_token)

            return jsonify({
                "session": refresh_response.session
            })
        except Exception as e:
            return {"error": str(e)}, 401
