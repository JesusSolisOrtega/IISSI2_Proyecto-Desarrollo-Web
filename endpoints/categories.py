from silence.decorators import endpoint

@endpoint(
    route="/categories",
    method="GET",
    sql="SELECT * FROM Categories"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/categories/$categoryId",
    method="GET",
    sql="SELECT * FROM Photos_Categories PC JOIN Photos P ON (PC.photoId = P.photoId) JOIN Categories C ON (PC.categoryId = C.categoryId) WHERE C.categoryId = $categoryId"
)
def get_by_category_id():
    pass

###############################################################################

@endpoint(
    route="/categories/photo/$photoId",
    method="GET",
    sql="SELECT * FROM Photos_Categories PC JOIN Photos P ON (PC.photoId = P.photoId) JOIN Categories C ON (PC.categoryId = C.categoryId) WHERE P.photoId = $photoId"
)
def get_by_photo_id():
    pass


###############################################################################

@endpoint(
    route="/categories",
    method="POST",
    sql="INSERT INTO Categories (category) VALUES ($category)",
    description="Creates a new category",
    auth_required=True,
)
def create(category):
    pass

###############################################################################

@endpoint(
    route="/categories/$photoId",
    method="POST",
    sql="INSERT INTO Photos_Categories (categoryId, photoId) VALUES ($categoryId, $photoId)",
    description="Add category to an existing photo",
    auth_required=True,
)
def update(categoryId):
    pass

###############################################################################

@endpoint(
    route="/categories/$categoryId/$photoId",
    method="DELETE",
    sql="DELETE FROM Photos_Categories WHERE categoryId = $categoryId AND photoId = $photoId",
    description="Removes a category from a photo",
    auth_required=True,
)
def delete():
    pass

####################################################
