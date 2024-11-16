import datetime
from flask import Flask, jsonify, request
from supabase import Client

# Routes for events (event search)
def EventRoutes(app: Flask, supabase: Client):
    @app.route('/events/<int:clubId>', methods=['GET'])
    def get_events(clubId):
        """
        Returns a paginated list of a club's events, optionally filtered by date.

        URL Parameters:
            page (int): Page number for pagination (default: 1).
            page_size (int): Number of events per page (default: 10).
            start_time (str): Filter start time for events in 'YYYY-MM-DDTHH:MM:SSZ' format (optional).
            end_time (str): Filter end time for events in 'YYYY-MM-DDTHH:MM:SSZ' format (optional).

        Returns:
            JSON: A paginated list of events with metadata.
        """
        try:
            # Pagination parameters with default values
            page = request.args.get('page', default=1, type=int)
            page_size = request.args.get('page_size', default=10, type=int)
            offset = (page - 1) * page_size

            # Date filtering parameters
            start_time = request.args.get('start_time') or datetime.datetime.min.strftime('%Y-%m-%dT%H:%M:%SZ')
            end_time = request.args.get('end_time') or datetime.datetime.max.strftime('%Y-%m-%dT%H:%M:%SZ')

            # Build query
            query = supabase.table('events') \
                .select('*') \
                .eq('club_id', clubId) \
                .gte('event_time', start_time) \
                .lte('event_time', end_time) \
                .range(offset, offset + page_size - 1)

            # Execute query
            response = query.execute()
            data = response.data
            total_count = response.count if response.count is not None else len(data)
            total_pages = (total_count + page_size - 1) // page_size

            return jsonify({
                "page": page,
                "page_size": page_size,
                "total_pages": total_pages,
                "total_events": total_count,
                "events": data
            })

        except Exception as e:
            return jsonify({"error": str(e)}), 500
