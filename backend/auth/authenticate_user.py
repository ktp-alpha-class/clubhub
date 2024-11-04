from functools import wraps
from flask import request
from supabase import Client

def authenticate_user(supabase: Client):
    """
    Decorator that ensures an endpoint only works if the requestor passes in a valid access token.
    Used like a standard route decorator:

    @app.route('/protected-endpoint', methods=['GET'])
    @authenticate_user(supabase)
    def protected_endpoint(user_id):
        # Only authenticated requests will reach here
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
                user = supabase.auth.get_user(token)
                if user is None:
                    return {'error': 'Unauthorized'}, 401
                
                # Add user ID to kwargs for route handler
                kwargs['user_id'] = user.user.id
                
                return f(*args, **kwargs)
                
            except Exception as e:
                return {'error': 'Unauthorized'}, 401
            
        return decorated
    return decorator