from silence.decorators import endpoint


@endpoint(
    route="/comments",
    method="GET",
    sql="SELECT * FROM comments"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/comments/$photoId",
    method="GET",
    sql="SELECT * FROM Comments WHERE photoId = $photoId"
)

def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/comments/$photoId/$userId",
    method="POST",
    sql="INSERT INTO Comments (commentary, photoId, userId) VALUES ($commentary, $photoId, $userId)",
    description="add a comment",
    auth_required=True,
)
def create(commentary):
    pass