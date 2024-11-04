from functools import wraps
from flask import request
from supabase import Client

def authenticate_club_admin(supabase: Client):
    """
    Decorator that ensures an endpoint only works if the requestor passes in a valid access token, and the requestor is an admin of the given club.
    The given club is determined by the club_id parameter in the route. Make sure you have a club_id parameter in your route definition! Otherwise this middleware will break your endpoint.
    Used like a standard route decorator:

    @app.route('/protected-endpoint/:club-id', methods=['GET'])
    @authenticate_club_admin
    def protected_endpoint(admin_id):
        # Only authenticated requests by admins of the given club will reach here
        return jsonify({'message': f'Hello, {user_id}!'})
    """
    
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            # Get token from Authorization header
            token = request.headers.get('Authorization')
            
            if not token:
                return {'error': 'Unauthorized'}, 401
            
            try:
                # Verify token with Supabase client
                supabase: Client = kwargs['supabase']
                user = supabase.auth.get_user(token)
                if user is None:
                    return {'error': 'Unauthorized'}, 401
            
                # Check if user is an admin of the given club
                # Uncomment this when we have a club_admins table
                #club_id = kwargs['club_id']
                #club_admin = supabase.table('club_admins').select('*').eq('user_id', user.id).eq('club_id', club_id).execute().data
                #if club_admin is None:
                #    return {'error': 'Unauthorized'}, 401
                
                # Add user ID to kwargs for route handler
                kwargs['user_id'] = user.id
                
                return f(*args, **kwargs)
                
            except Exception as e:
                return {'error': 'Unauthorized'}, 401
        
        return decorated
    return decorator
