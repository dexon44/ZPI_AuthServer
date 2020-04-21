import os

from flask import Blueprint, jsonify

from ..decorators import login_required
from ..utilities import create_jwt

jwt_rest_bp = Blueprint('jwt_rest_bp', __name__)


@jwt_rest_bp.route('/api/v1/user', methods=['POST'])
@login_required
def jwt(user):
    username = user.username
    email = user.email
    private_key = os.environ.get('private_key')
    public_key = os.environ.get('public_key')
    token = create_jwt(username, email)
    # encoded = jwt.encode({'some': 'payload'}, private_key, algorithm='HS256')
    # jwt.encode({'some': 'payload'}, private_key, algorithm='HS256')
    # encoded = jwt.PyJWT.encode({'some': 'payload'}, private_key, algorithm='HS256')
    return jsonify(token=token.decode('UTF-8')), 200
