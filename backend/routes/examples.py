from flask import Flask, jsonify
from supabase import Client

# Single route function for this file, that handles all routes pertaining to
# 'Examples' (something I made up)
def ExamplesRoutes(app: Flask, supabase: Client):
    # Example GET route definition
    @app.route("/examples")
    def get_examples():
        examples = supabase.table("examples").select("*").execute()
        return jsonify(examples.data)
    
    # Notice how there are multiple route definitions in this file, but they
    # all pertain to one feature (in this case our 'Examples' model I made up)
    @app.route("/examples/<id>")
    def get_example_by_id(id):
        examples = supabase.table("examples").select("*").eq("id", id).execute
        return jsonify(examples.data)