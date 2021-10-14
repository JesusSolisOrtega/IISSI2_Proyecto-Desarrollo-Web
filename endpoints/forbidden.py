from silence.decorators import endpoint


@endpoint(
    route="/forbidden",
    method="GET",
    sql="SELECT * FROM forbiddenwords"
)
def get_all():
    pass