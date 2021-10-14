from silence.decorators import endpoint

@endpoint(
    route="/ratings",
    method="GET",
    sql="SELECT * FROM ratings"
)
def get_all():
    pass

######################################################


@endpoint(
    route="/ratings",
    method="POST",
    sql="INSERT INTO Ratings (rating, photoId, userId) VALUES ($rating, $photoId, $userId)",
    description="Creates a new rate",
    auth_required=True,
)
def rate_photo(rating, photoId, userId):
    pass


#####################################################

@endpoint(
    route="/ratings/$photoId/$userId",
    method="PUT",
    sql="UPDATE Ratings SET rating = $rating WHERE photoId = $photoId and userId = $userId",
    description="Updates an existing rate",
    auth_required=True,
)
def update(rating):
    pass

####################################################

@endpoint(
    route="/ratings/$photoId",
    method="GET",
    sql="SELECT * FROM Ratings WHERE photoId = $photoId"
)

def get_rating():
    pass